"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ColorOption } from "@/types/vehicle";

interface KrpanoInstance {
  call: (action: string) => void;
}

interface EmbedpanoOptions {
  id: string;
  target: string;
  xml: string;
  html5: "only";
  mobilescale: number;
  passQueryParameters: boolean;
  initvars: Record<string, string>;
  onready: (krpano: KrpanoInstance) => void;
  onerror: (message: string) => void;
}

declare global {
  interface Window {
    embedpano?: (options: EmbedpanoOptions) => void;
    removepano?: (id: string) => void;
  }
}

const TOUR_SCRIPT_SRC = "/vtour/tour.js";

let tourScriptPromise: Promise<void> | null = null;

function loadTourScript(): Promise<void> {
  if (tourScriptPromise) return tourScriptPromise;

  tourScriptPromise = new Promise<void>((resolve, reject) => {
    if (typeof window.embedpano === "function") {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${TOUR_SCRIPT_SRC}"]`,
    );
    const script = existing ?? document.createElement("script");

    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener(
      "error",
      () => {
        tourScriptPromise = null;
        reject(new Error("Failed to load the krpano runtime."));
      },
      { once: true },
    );

    if (!existing) {
      script.src = TOUR_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return tourScriptPromise;
}

function loadSceneAction(value: string): string {
  return `loadscene(scene_${value}, null, MERGE, BLEND(0.5))`;
}

interface InteriorPanoProps {
  id: string;
  colors: ColorOption[];
}

export function InteriorPano({ id, colors }: InteriorPanoProps) {
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const targetId = `pano-inside-${instanceId}`;
  const panoId = `krpanoSWFObject_inside-${instanceId}`;

  const [activeValue, setActiveValue] = useState(() => colors[0]?.value ?? "");
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const krpanoRef = useRef<KrpanoInstance | null>(null);
  const activeValueRef = useRef(activeValue);
  // The scene krpano boots into on its own: T2.xml's startup action loads the
  // first declared scene, which mirrors colors[0].
  const bootValueRef = useRef(activeValue);

  useEffect(() => {
    let cancelled = false;
    let embedded = false;

    loadTourScript()
      .then(() => {
        if (cancelled) return;

        const { embedpano, removepano } = window;
        if (!embedpano || !removepano) return;

        removepano(panoId);
        embedded = true;

        embedpano({
          id: panoId,
          target: targetId,
          xml: `/vtour/${id}.xml`,
          html5: "only",
          mobilescale: 1,
          passQueryParameters: true,
          initvars: { imgpath: "/vtour/panos/" },
          onready: (krpano) => {
            if (cancelled) return;
            krpanoRef.current = krpano;
            setIsReady(true);
            // A colour picked while the runtime was still downloading never
            // reached the viewer; reconcile it now that one exists.
            if (activeValueRef.current !== bootValueRef.current) {
              krpano.call(loadSceneAction(activeValueRef.current));
            }
          },
          onerror: () => {
            if (cancelled) return;
            setHasError(true);
          },
        });
      })
      .catch(() => {
        if (cancelled) return;
        setHasError(true);
      });

    return () => {
      cancelled = true;
      krpanoRef.current = null;
      setIsReady(false);
      // removepano() unloads the viewer and removes the element krpano injected
      // into the target. Without it every remount stacks another live canvas
      // (and its WebGL context) inside the container.
      if (embedded) window.removepano?.(panoId);
    };
  }, [id, panoId, targetId]);

  const handleSelect = useCallback((value: string) => {
    activeValueRef.current = value;
    setActiveValue(value);
    krpanoRef.current?.call(loadSceneAction(value));
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* krpano owns this element's children (it injects the viewer here and
          overwrites innerHTML on failure), so React must never render into it. */}
      <div id={targetId} className="absolute inset-0 z-0" />

      {activeValue && !hasError ? (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-[1] transition-opacity duration-500",
            isReady ? "opacity-0" : "opacity-100",
          )}
          style={{
            // preview.jpg is a krpano cube strip: six 256px faces stacked
            // l,f,r,b,u,d. 600% height + 20% offset isolates the front face.
            backgroundImage: `url(/vtour/panos/${activeValue}.tiles/preview.jpg)`,
            backgroundSize: "100% 600%",
            backgroundPosition: "0 20%",
          }}
        />
      ) : null}

      {hasError ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center px-6 text-center text-[0.14rem] text-white/70 md:text-[0.16rem]">
          The 360° interior view is unavailable right now.
        </div>
      ) : null}

      <div
        role="radiogroup"
        aria-label="Interior colour"
        className="absolute bottom-10 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-5 md:bottom-10 md:gap-4"
      >
        {colors.map((option) => {
          const isActive = option.value === activeValue;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={option.label}
              title={option.label}
              onClick={() => handleSelect(option.value)}
              className={cn(
                "h-12 w-12 cursor-pointer rounded-full border border-white/40 transition-transform duration-300 md:h-10 md:w-10",
                "hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
                isActive && "scale-110 border-white ring-2 ring-white",
              )}
              style={{ background: option.color }}
            />
          );
        })}
      </div>
    </div>
  );
}

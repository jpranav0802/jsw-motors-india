"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ThreeDHallData } from "@/types/vehicle";

import { ExteriorSpin } from "./ExteriorSpin";
import { InteriorPano } from "./InteriorPano";

/**
 * Extra scroll distance the pin consumes, as a multiple of viewport height.
 * One full rotation of the car is spread across this, so it sets how fast the
 * car turns per unit of scroll.
 */
const SPIN_SCROLL_VH = 2.5;
/** Viewport margin at which the frame sequence starts downloading. */
const PRELOAD_MARGIN = "100%";

type HallTab = "exterior" | "interior";

const TABS: { id: HallTab; label: string }[] = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
];

interface ThreeDHallProps {
  data: ThreeDHallData;
}

export function ThreeDHall({ data }: ThreeDHallProps) {
  const [tab, setTab] = useState<HallTab>("exterior");
  const [progress, setProgress] = useState(0);
  const [shouldLoad, setShouldLoad] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  /**
   * The section owns its pin, deliberately — not ExteriorSpin.
   *
   * ExteriorSpin unmounts when the user opens the Interior tab. If it owned the
   * pin, switching tabs would kill it mid-scroll: 2.5 viewports of pin-spacer
   * vanish under the reader, the scroll position becomes invalid, and Lenis and
   * ScrollTrigger fight over correcting it until the tab locks up. Creating the
   * pin once here keeps the section's geometry stable across tab switches.
   */
  useEffect(() => {
    const section = rootRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const preload = ScrollTrigger.create({
      trigger: section,
      start: `top bottom+=${PRELOAD_MARGIN}`,
      once: true,
      onEnter: () => setShouldLoad(true),
    });

    const pin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${SPIN_SCROLL_VH * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 0.6,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => {
      preload.kill();
      pin.kill();
    };
  }, []);

  return (
    <div ref={rootRef} className="w-full h-svh relative overflow-hidden">
      <div className="absolute z-2 top-50 md:top-[1.46rem] inset-x-12 md:left-auto md:right-[0.45rem] flex md:flex-col justify-between items-center md:items-start gap-6">
        <div
          role="tablist"
          aria-label="Vehicle 3D hall"
          className="flex md:flex-col items-center md:items-start gap-6 md:gap-4"
        >
          {TABS.map((item) => {
            const active = tab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(item.id)}
                className={cn(
                  "relative cursor-pointer whitespace-nowrap pb-2 font-display text-[0.28rem] md:text-base tracking-wide transition-colors duration-300",
                  active ? "text-black" : "text-black/40 hover:text-black/70",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute bottom-0 left-0 h-[0.02rem] bg-black transition-all duration-300",
                    active ? "w-full opacity-100" : "w-0 opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>

        <Link href={`/${data.id}/specification`} className="w-auto md:w-full">
          {/* Sizing mirrors the target's Button component CSS: .17rem text,
              .05rem radius, .02rem border. */}
          <span className="group relative inline-flex md:w-full items-center justify-center whitespace-nowrap px-6 md:px-0 text-center h-16 md:h-15 text-[0.17rem] text-black rounded-[0.05rem] border-[0.02rem] border-black">
            <span className="absolute -inset-[0.02rem] rounded-[0.05rem] border-[0.02rem] border-black bg-transparent opacity-50 transition-all duration-300 group-hover:bg-white group-hover:opacity-100" />
            <span className="relative z-10">Specification</span>
          </span>
        </Link>
      </div>

      {tab === "exterior" ? (
        <ExteriorSpin
          id={data.id}
          num={data.num}
          endFrame={data.endFrame}
          colors={data.exteriorList}
          progress={progress}
          shouldLoad={shouldLoad}
        />
      ) : (
        <InteriorPano id={data.id} colors={data.interiorList} />
      )}
    </div>
  );
}

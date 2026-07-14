/* eslint-disable @next/next/no-img-element -- the spin viewer swaps a raw <img>
   src between preloaded frames; next/image would re-run its loader per frame. */
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import type { ColorOption } from "@/types/vehicle";

import { ColorChange } from "./ColorChange";

interface ExteriorSpinProps {
  id: string;
  num: number;
  endFrame: number;
  colors: ColorOption[];
  /**
   * The section to pin while the car spins. Scroll progress across the pin is
   * scrubbed onto the frame sequence, so the car rotates in step with the
   * scroll rather than on a timer.
   */
  pinTarget: React.RefObject<HTMLDivElement | null>;
}

/** Fraction of the stage width the user drags to complete one full rotation. */
const DRAG_TURN_RATIO = 0.6;
/** Frames decoded per batch while loading a colour sequence. */
const PRELOAD_BATCH = 6;
/**
 * Extra scroll distance the pin consumes, as a multiple of viewport height.
 * One full rotation is spread across this, so it sets how fast the car turns.
 */
const SPIN_SCROLL_VH = 2.5;
/** Viewport margin at which the frames start downloading, ahead of the pin. */
const PRELOAD_MARGIN = "100%";

function frameSrc(id: string, color: string, frame: number): string {
  return `/exterior/${id}/${color}/${String(frame).padStart(2, "0")}.png`;
}

function wrapFrame(frame: number, num: number): number {
  return ((frame % num) + num) % num;
}

/**
 * Resolves once the frame is fetched, and never rejects — a missing frame must
 * not stall the sequence behind a pending promise.
 *
 * Deliberately does not call img.decode(): on a detached <img> Chromium leaves
 * that promise pending forever, which hangs the batch loop. `onload` already
 * means the bytes are in the HTTP cache, which is what makes the later src swap
 * cheap; the decode then happens on paint.
 */
function preloadFrame(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

export function ExteriorSpin({ id, num, endFrame, colors, pinTarget }: ExteriorSpinProps) {
  const initialColor = colors[0]?.value ?? "";

  const [color, setColor] = useState(initialColor);
  /** The colour actually on screen: it lags `color` until the new sequence has
   *  decoded, so switching swatches never flashes a half-loaded frame. */
  const [renderColor, setRenderColor] = useState(initialColor);
  const [loadState, setLoadState] = useState({ color: initialColor, loaded: 0 });
  const [frame, setFrame] = useState(endFrame);
  const [dragging, setDragging] = useState(false);
  /**
   * Gates the frame download. All eight sections mount at once, so preloading
   * eagerly would decode 36 frames (~133MB of bitmaps) on page load and wedge
   * the renderer — the failure the target site itself exhibits. Flipped by a
   * ScrollTrigger a viewport ahead of the pin, so frames are ready on arrival.
   */
  const [nearViewport, setNearViewport] = useState(false);

  const loaded = loadState.color === color ? loadState.loaded : 0;
  const ready = num > 0 && loaded >= num;

  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(endFrame);
  const dragRef = useRef<{ pointerId: number; startX: number; startFrame: number } | null>(null);
  /**
   * Holds the decoded frames of the *active* colour only. Keeping them
   * referenced keeps the decoded bitmaps warm so an src swap is a repaint
   * rather than a re-decode; dropping the previous colour's array on switch is
   * what stops all 216 frames accumulating in memory.
   */
  const cacheRef = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    frameRef.current = frame;
  }, [frame]);

  useEffect(() => {
    if (!color || !nearViewport) return;

    let cancelled = false;
    let settled = 0;

    const sources = Array.from({ length: num }, (_, index) => frameSrc(id, color, index));

    // Decoded in small batches rather than all at once: 36 concurrent decodes of
    // 1316x740 frames blocks the main thread long enough to stall the renderer.
    const run = async () => {
      const images: HTMLImageElement[] = [];
      for (let i = 0; i < sources.length; i += PRELOAD_BATCH) {
        if (cancelled) return;
        const batch = await Promise.all(sources.slice(i, i + PRELOAD_BATCH).map(preloadFrame));
        if (cancelled) return;
        images.push(...batch);
        settled += batch.length;
        setLoadState({ color, loaded: settled });
      }
      cacheRef.current = images;
      setRenderColor(color);
    };
    void run();

    return () => {
      cancelled = true;
    };
  }, [id, color, num, nearViewport]);

  /** Starts the download a viewport early so the pin is never reached unloaded. */
  useEffect(() => {
    const section = pinTarget.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: `top bottom+=${PRELOAD_MARGIN}`,
      once: true,
      onEnter: () => setNearViewport(true),
    });

    return () => trigger.kill();
  }, [pinTarget]);

  /**
   * Pins the section and maps scroll progress onto the frame sequence. Frames
   * advance from `endFrame` so the car is already at its hero angle when the
   * pin engages, then completes one rotation across the scrub.
   */
  useEffect(() => {
    const section = pinTarget.current;
    if (!section || !ready) return;

    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${SPIN_SCROLL_VH * 100}%`,
      pin: true,
      pinSpacing: true,
      scrub: 0.6,
      onUpdate: (self) => {
        // Dragging takes over while the pointer is down.
        if (dragRef.current) return;
        setFrame(wrapFrame(endFrame + Math.round(self.progress * num), num));
      },
    });

    return () => trigger.kill();
  }, [pinTarget, ready, num, endFrame]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ready) return;

    setDragging(true);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startFrame: frameRef.current,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const width = stageRef.current?.clientWidth ?? 0;
    if (width === 0) return;

    const pxPerFrame = (width * DRAG_TURN_RATIO) / num;
    const delta = Math.round((event.clientX - drag.startX) / pxPerFrame);

    // Frame 00 is the rear, 09 the nose pointing right, 18 the nose at the
    // camera: the index runs clockwise seen from above, so a rightward drag —
    // which sweeps the near side right — walks the sequence backwards.
    setFrame(wrapFrame(drag.startFrame - delta, num));
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const percent = num > 0 ? Math.round((loaded / num) * 100) : 0;

  return (
    <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/images/vehicles/3d-hall/bg-exterior.png"
        alt=""
      />

      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className={cn(
          "w-full h-full flex justify-center items-center relative select-none touch-pan-y",
          ready ? (dragging ? "cursor-grabbing" : "cursor-grab") : "cursor-progress",
        )}
      >
        <img
          src={frameSrc(id, renderColor, frame)}
          alt=""
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {!ready && (
          <span className="relative z-10 font-display text-sm tabular-nums text-black/50">
            {percent}%
          </span>
        )}
      </div>

      <div className="absolute z-9 bottom-[6rem] md:bottom-[16vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[76vw] pointer-events-none">
        <img
          className="w-full h-auto object-cover"
          src="/images/vehicles/3d-hall/soild.png"
          alt=""
        />
      </div>

      <ColorChange colors={colors} value={color} onChange={setColor} />
    </div>
  );
}

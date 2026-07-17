/* eslint-disable @next/next/no-img-element -- static photos */
"use client";

import { useEffect, useRef } from "react";

interface J5SliderProps {
  images: string[];
}

/**
 * A horizontal photo showcase driven by vertical scroll.
 *
 * The outer wrapper is tall; an inner panel sticks to the top of the viewport
 * while the wrapper scrolls through it, and that scroll progress is mapped onto
 * a sideways translate of the photo track — so the album glides right as the
 * user scrolls down.
 *
 * Driven imperatively (ref + transform, no React state) so it never re-renders
 * per frame, and stepped from a scroll listener rather than an
 * IntersectionObserver for the same reason the Reveal component is: a fast
 * Lenis-smoothed scroll must never leave the track stranded mid-travel.
 */
export function J5Slider({ images }: J5SliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      // How far the wrapper has travelled through the sticky window, 0 → 1.
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const maxX = track.scrollWidth - track.clientWidth;
      track.style.transform = `translate3d(${-progress * maxX}px,0,0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    // Tall wrapper: gives the sticky panel room to translate the track.
    <div ref={wrapRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-[0.24rem] px-2 md:px-[0.1rem] will-change-transform"
        >
          {images.map((src) => (
            <div
              key={src}
              className="shrink-0 w-[80vw] md:w-[42vw] overflow-hidden rounded-[0.16rem]"
            >
              <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

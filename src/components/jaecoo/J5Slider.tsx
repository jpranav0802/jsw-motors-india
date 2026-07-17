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
 * Driven by its own requestAnimationFrame loop reading the section's live
 * position, rather than a window `scroll` listener or gsap.ticker: Lenis on this
 * page does not emit native window scroll events, and the component's bundled
 * gsap instance is not the one being stepped. A plain rAF reads window.scrollY
 * (which Lenis updates every frame) so the track stays perfectly in sync with
 * the smooth scroll. (rAF naturally pauses while the tab is hidden — exactly
 * what we want, since nothing needs animating when nobody's looking.)
 */
export function J5Slider({ images }: J5SliderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const panel = panelRef.current;
    const track = trackRef.current;
    if (!wrap || !panel || !track) return;

    let raf = 0;
    let lastX = NaN;
    const loop = () => {
      const rect = wrap.getBoundingClientRect();
      // Distance the wrapper travels while its sticky panel is pinned.
      const scrollable = rect.height - panel.clientHeight;
      // 0 when the panel first pins, 1 when the wrapper has fully passed.
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
      // Travel is measured against the visible panel, not the track's own
      // width — the track has no overflow so its clientWidth == scrollWidth.
      const maxX = Math.max(0, track.scrollWidth - panel.clientWidth);
      const x = -progress * maxX;
      if (x !== lastX) {
        lastX = x;
        track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [images.length]);

  return (
    // Tall wrapper gives the sticky panel room to translate the track sideways.
    <div ref={wrapRef} className="relative h-[280vh]">
      <div
        ref={panelRef}
        className="sticky top-0 flex h-svh items-center overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex gap-6 md:gap-[0.24rem] px-12 md:px-[0.7rem] will-change-transform"
        >
          {images.map((src) => (
            <div
              key={src}
              className="shrink-0 w-[80vw] md:w-[46vw] overflow-hidden rounded-[0.16rem]"
            >
              <img src={src} alt="" className="aspect-[16/10] w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element -- static photos */
"use client";

import { useRef } from "react";

interface J5SliderProps {
  images: string[];
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-6 md:size-[0.24rem]">
      <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function J5Slider({ images }: J5SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * track.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-[0.24rem] overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src) => (
          <div
            key={src}
            className="snap-start shrink-0 w-[85%] md:w-[42%] overflow-hidden rounded-[0.16rem]"
          >
            <img src={src} alt="" className="aspect-[4/3] w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-6 md:mt-[0.24rem] flex items-center gap-3 md:gap-[0.12rem]">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous"
          className="grid place-items-center size-12 md:size-[0.5rem] rounded-full border border-black/15 bg-white text-black cursor-pointer transition-colors hover:bg-black hover:text-white hover:border-black"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next"
          className="grid place-items-center size-12 md:size-[0.5rem] rounded-full border border-black/15 bg-white text-black cursor-pointer transition-colors hover:bg-black hover:text-white hover:border-black"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  );
}

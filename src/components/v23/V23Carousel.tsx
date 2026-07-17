/* eslint-disable @next/next/no-img-element -- static studio frames, no loader needed */
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface V23CarouselProps {
  images: string[];
  /** Aspect ratio utility, e.g. "aspect-[1473/1177]". */
  aspect?: string;
  className?: string;
  rounded?: string;
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-[0.3rem] md:size-[0.24rem]">
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function V23Carousel({ images, aspect = "aspect-[16/9]", className, rounded = "rounded-[0.12rem]" }: V23CarouselProps) {
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((n) => (n + delta + images.length) % images.length);

  return (
    <div className={cn("relative overflow-hidden bg-black/5", aspect, rounded, className)}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-4 md:left-[0.16rem] top-1/2 -translate-y-1/2 grid place-items-center size-[0.6rem] md:size-[0.48rem] rounded-[0.06rem] bg-white/85 text-black shadow-md cursor-pointer transition-colors hover:bg-white"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-4 md:right-[0.16rem] top-1/2 -translate-y-1/2 grid place-items-center size-[0.6rem] md:size-[0.48rem] rounded-[0.06rem] bg-white/85 text-black shadow-md cursor-pointer transition-colors hover:bg-white"
          >
            <Chevron dir="right" />
          </button>
        </>
      )}
    </div>
  );
}

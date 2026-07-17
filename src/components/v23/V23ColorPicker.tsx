/* eslint-disable @next/next/no-img-element -- single transparent studio PNG, tinted via CSS */
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * The source site swaps a separate studio render per colour. We only ship the
 * orange render, so each shade re-tints it with a CSS filter — the car visibly
 * changes colour on click, which is the interaction the picker is about.
 */
const SHADES = [
  { name: "Vibe Orange", swatch: "#e8622a", filter: "none" },
  { name: "Pearl White", swatch: "#eef0ec", filter: "saturate(0.1) brightness(1.55)" },
  { name: "Silver Grey", swatch: "#9aa1a4", filter: "saturate(0.18) brightness(1.15)" },
  { name: "Sky Blue", swatch: "#3f6d9c", filter: "hue-rotate(178deg) saturate(1.05)" },
  { name: "Dynamic Green", swatch: "#4c6a3f", filter: "hue-rotate(95deg) saturate(0.85)" },
  { name: "Crimson Red", swatch: "#b02a22", filter: "hue-rotate(-26deg) saturate(1.25)" },
  { name: "Midnight Black", swatch: "#1e1e20", filter: "saturate(0.25) brightness(0.4)" },
];

export function V23ColorPicker() {
  const [index, setIndex] = useState(0);
  const active = SHADES[index];

  return (
    <div className="text-center">
      <img
        src="/v23/side-profile.png"
        alt={`JSW V23 in ${active.name}`}
        style={{ filter: active.filter }}
        className="mt-[0.5rem] md:mt-[0.3rem] w-full max-w-[13rem] mx-auto object-contain transition-[filter] duration-500 ease-out"
      />

      <p className="mt-[0.3rem] md:mt-[0.24rem] text-[0.3rem] md:text-[0.18rem] text-[#5b564e]">
        Color Options : <span className="font-medium text-[#4a4640]">{active.name}</span>
      </p>

      <div className="mt-[0.3rem] md:mt-[0.24rem] flex items-center justify-center gap-5 md:gap-[0.2rem]">
        {SHADES.map((shade, n) => (
          <button
            key={shade.name}
            type="button"
            onClick={() => setIndex(n)}
            title={shade.name}
            aria-label={shade.name}
            aria-pressed={n === index}
            style={{ background: shade.swatch }}
            className={cn(
              "size-10 md:size-[0.4rem] rounded-full border cursor-pointer transition-transform duration-200",
              n === index
                ? "border-[#4a4640] scale-110 ring-2 ring-black/25 ring-offset-2 ring-offset-transparent"
                : "border-black/20 hover:scale-105",
            )}
          />
        ))}
      </div>
    </div>
  );
}

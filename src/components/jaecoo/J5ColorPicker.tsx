/* eslint-disable @next/next/no-img-element -- static studio composites */
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const COLORS = [
  {
    name: "Granite White",
    swatch: "#e6e4df",
    image: "/jaecoo-j5/color-granite-white.webp",
    caption: "A crisp, confident white with a soft pearlescent finish that catches the light.",
  },
  {
    name: "Copper Green",
    swatch: "#66786a",
    image: "/jaecoo-j5/color-copper-green.webp",
    caption: "An earthy metallic green with a warm shimmer — made for the great outdoors.",
  },
  {
    name: "Basalt Black",
    swatch: "#1d1f20",
    image: "/jaecoo-j5/color-basalt-black.webp",
    caption: "A deep, glossy black that gives the J5 a bold, commanding presence.",
  },
  {
    name: "Lazuli Blue",
    swatch: "#2b4c5e",
    image: "/jaecoo-j5/color-lazuli-blue.webp",
    caption: "A rich, jewel-like blue with a shimmering depth that stands out from every angle.",
  },
];

export function J5ColorPicker() {
  const [index, setIndex] = useState(3);
  const active = COLORS[index];

  return (
    <div>
      <div className="relative overflow-hidden rounded-[0.16rem]">
        {COLORS.map((c, i) => (
          <img
            key={c.name}
            src={c.image}
            alt={`Jaecoo J5 in ${c.name}`}
            className={cn(
              "h-full w-full object-cover transition-opacity duration-500",
              i === index ? "opacity-100" : "absolute inset-0 opacity-0",
            )}
          />
        ))}
      </div>

      <div className="mt-8 md:mt-[0.3rem] flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-[0.4rem]">
        <div className="md:max-w-[9rem]">
          <h3 className="font-display text-2xl md:text-[0.3rem] font-medium">{active.name}</h3>
          <p className="mt-2 md:mt-[0.08rem] text-base md:text-[0.16rem] leading-relaxed text-black/55">
            {active.caption}
          </p>
        </div>

        <div className="flex items-center gap-4 md:gap-[0.16rem]">
          {COLORS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setIndex(i)}
              title={c.name}
              aria-label={c.name}
              aria-pressed={i === index}
              style={{ background: c.swatch }}
              className={cn(
                "size-9 md:size-[0.44rem] rounded-full border cursor-pointer transition-transform duration-200",
                i === index
                  ? "border-black scale-110 ring-2 ring-black/25 ring-offset-2 ring-offset-[#f6f6f6]"
                  : "border-black/15 hover:scale-105",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element -- static studio photos */
"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

interface Hotspot {
  x: number;
  y: number;
  label: string;
}
interface Feature {
  image: string;
  title: string;
  body: string;
}
interface View {
  image: string;
  hotspots: Hotspot[];
  features: Feature[];
}

const VIEWS: Record<"exterior" | "interior", View> = {
  exterior: {
    image: "/jaecoo-j5/exterior.webp",
    hotspots: [
      { x: 56, y: 41, label: "Flush door handles" },
      { x: 25, y: 62, label: "Full-width light bar" },
      { x: 41, y: 72, label: "Aero alloy wheels" },
    ],
    features: [
      { image: "/jaecoo-j5/ex1.webp", title: "Pure Electric Identity", body: "A clean, sculpted silhouette with full-width light signatures." },
      { image: "/jaecoo-j5/ex2.webp", title: "Silent Glass", body: "A panoramic glass roof with acoustic glazing for a hushed cabin." },
      { image: "/jaecoo-j5/ex3.webp", title: "Striking Alloy Wheels", body: "Aero-optimised alloys that cut drag and add presence." },
    ],
  },
  interior: {
    image: "/jaecoo-j5/interior.webp",
    hotspots: [
      { x: 24, y: 52, label: "Portrait touchscreen" },
      { x: 52, y: 44, label: "Multi-function wheel" },
      { x: 74, y: 42, label: "Ambient lighting" },
    ],
    features: [
      { image: "/jaecoo-j5/in1.webp", title: "Portrait Touchscreen", body: "A large portrait display puts everything within easy reach." },
      { image: "/jaecoo-j5/in2.webp", title: "Ambient Lighting", body: "Configurable ambient light sets the mood for every drive." },
      { image: "/jaecoo-j5/in3.webp", title: "Premium Materials", body: "Soft-touch surfaces and quality finishes throughout the cabin." },
    ],
  },
};

const TABS = ["exterior", "interior"] as const;

export function J5Viewer() {
  const [tab, setTab] = useState<"exterior" | "interior">("exterior");
  const view = VIEWS[tab];

  return (
    <div>
      {/* Exterior / Interior pill toggle */}
      <div className="mx-auto flex w-fit items-center rounded-full bg-white p-1.5 md:p-[0.05rem] shadow-[0_0.02rem_0.16rem_rgba(0,0,0,0.08)]">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={cn(
              "h-12 md:h-[0.5rem] px-8 md:px-[0.4rem] rounded-full text-base md:text-[0.18rem] font-medium capitalize cursor-pointer transition-colors duration-300",
              tab === t ? "bg-black text-white" : "text-black/60 hover:text-black",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Car image with hotspots */}
      <div className="relative mt-10 md:mt-[0.4rem] overflow-hidden rounded-[0.16rem] bg-[#eceded]">
        <img src={view.image} alt={`Jaecoo J5 ${tab}`} className="w-full object-cover" />
        {view.hotspots.map((h) => (
          <span
            key={h.label}
            title={h.label}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span className="block size-6 md:size-[0.28rem] rounded-full bg-white shadow-[0_0_0_0.06rem_rgba(255,255,255,0.4)]" />
            <span className="absolute inset-0 rounded-full bg-white/70 animate-ping" />
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/80 px-3 md:px-[0.12rem] py-1 text-xs md:text-[0.12rem] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {h.label}
            </span>
          </span>
        ))}
      </div>

      {/* Feature cards for the active view */}
      <div className="mt-10 md:mt-[0.4rem] grid gap-8 md:gap-[0.32rem] md:grid-cols-3">
        {view.features.map((feature) => (
          <article key={feature.title} className="overflow-hidden rounded-[0.16rem] bg-white shadow-[0_0.04rem_0.24rem_rgba(0,0,0,0.06)]">
            <div className="aspect-[596/735] overflow-hidden">
              <img src={feature.image} alt={feature.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]" />
            </div>
            <div className="p-8 md:p-[0.3rem]">
              <h3 className="font-display text-xl md:text-[0.22rem] font-medium">{feature.title}</h3>
              <p className="mt-3 md:mt-[0.12rem] text-base md:text-[0.15rem] leading-relaxed text-black/60">{feature.body}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

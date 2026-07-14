"use client";

import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ThreeDHallData } from "@/types/vehicle";

import { ExteriorSpin } from "./ExteriorSpin";
import { InteriorPano } from "./InteriorPano";

type HallTab = "exterior" | "interior";

const TABS: { id: HallTab; label: string }[] = [
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
];

interface ThreeDHallProps {
  data: ThreeDHallData;
  /** True while this is the swiper's active slide; gates the spin frame preload. */
  active: boolean;
}

export function ThreeDHall({ data, active }: ThreeDHallProps) {
  const [tab, setTab] = useState<HallTab>("exterior");

  return (
    <div className="w-full h-svh relative overflow-hidden">
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
                  "relative cursor-pointer whitespace-nowrap pb-2 font-display text-base tracking-wide transition-colors duration-300",
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
          <span className="group relative inline-flex md:w-full items-center justify-center px-6 md:px-0 text-center h-16 md:h-15 text-black">
            <span className="absolute -inset-[0.02rem] border-[0.02rem] border-black bg-transparent opacity-50 transition-all duration-300 group-hover:bg-white group-hover:opacity-100" />
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
          active={active}
        />
      ) : (
        <InteriorPano id={data.id} colors={data.interiorList} />
      )}
    </div>
  );
}

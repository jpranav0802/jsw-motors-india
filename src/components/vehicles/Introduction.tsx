"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { TitledGalleryData } from "@/types/vehicle";

interface IntroductionProps {
  data: TitledGalleryData;
}

/** The data model carries only the desktop asset; the target serves the 320px
 *  art-directed crop from a sibling `_m` file of the same name. */
function mobileSrc(image: string): string {
  return image.replace(/\.png$/, "_m.png");
}

export function Introduction({ data }: IntroductionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { title, data: items } = data;

  return (
    <section className="w-full h-svh relative pt-60 md:pt-[1.88rem] pb-40 md:pb-[0.3rem] text-white">
      <div className="absolute inset-0 z-0 px-12 md:px-15">
        {items.map((item, index) => (
          <picture
            key={item.image}
            className={cn(
              "h-full absolute inset-0 w-full h-full object-cover transition-opacity duration-2000",
              index === activeIndex ? "opacity-100" : "opacity-0",
            )}
          >
            <source media="(min-width: 1024px)" srcSet={item.image} />
            <source media="(min-width: 768px)" srcSet={item.image} />
            <source media="(min-width: 320px)" srcSet={mobileSrc(item.image)} />
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-opacity duration-2000",
                index === activeIndex ? "opacity-100" : "opacity-0",
              )}
            />
          </picture>
        ))}
      </div>
      {/* Scrims (mobile only): white labels sit over a light studio image, so
          without these they wash out and read as bleeding over the car. A soft
          top and a stronger bottom gradient give the title and the label column
          a legible backdrop without touching the desktop overlay. */}
      <div
        aria-hidden
        className="md:hidden absolute inset-x-0 top-0 h-[26%] z-1 bg-gradient-to-b from-black/45 to-transparent pointer-events-none"
      />
      <div
        aria-hidden
        className="md:hidden absolute inset-x-0 bottom-0 h-[52%] z-1 bg-gradient-to-t from-black/80 via-black/55 to-transparent pointer-events-none"
      />
      <div className="relative z-2 flex flex-col justify-between h-full overflow-hidden px-12 md:px-15">
        <div className="relative">
          <div className="text-[0.5rem] md:text-[0.6rem] font-medium text-center font-display">{title}</div>
        </div>
        <div className="relative z-2 flex flex-col md:flex-row md:flex-nowrap justify-center items-center md:items-start gap-y-[0.24rem] gap-x-8 md:gap-x-10">
          {items.map((item, index) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-pressed={index === activeIndex}
              className={cn(
                "w-full md:basis-0 md:flex-1 cursor-pointer text-center whitespace-pre-line",
                "text-[0.28rem] md:text-2xl transition-opacity duration-500",
                index === activeIndex ? "opacity-100" : "opacity-60 hover:opacity-100",
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

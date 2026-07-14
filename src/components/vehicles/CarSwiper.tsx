"use client";

import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";
import type { CarSwiperData } from "@/types/vehicle";

import "swiper/css";

interface CarSwiperProps {
  data: CarSwiperData;
}

/** `/images/.../p1_1.png` -> `/images/.../p1_1_m.png`, the target's mobile crop. */
function mobileSrc(src: string): string {
  return src.replace(/(\.[a-z0-9]+)$/i, "_m$1");
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M15.5 4.5 8 12l7.5 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CarSwiper({ data }: CarSwiperProps) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="group relative w-full h-svh flex flex-col justify-center items-center transition-all duration-300 overflow-hidden text-white">
      <div className="absolute top-60 md:top-[1.88rem] w-full flex justify-center items-center pb-[5.93vh] z-9">
        <div className="text-[0.6rem] leading-none font-medium whitespace-pre-line text-center font-display">
          {data.title}
        </div>
      </div>
      <div className="relative size-full flex flex-col justify-center items-center">
        <Swiper
          className="size-full"
          modules={[Navigation]}
          slidesPerView={1}
          loop
          onBeforeInit={(swiper) => {
            const { navigation } = swiper.params;
            if (navigation && typeof navigation !== "boolean") {
              navigation.prevEl = prevRef.current;
              navigation.nextEl = nextRef.current;
            }
          }}
          onRealIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {data.data.map((item) => (
            <SwiperSlide
              key={item.id}
              /* `flex!`: swiper/css is unlayered and beats Tailwind's @layer utilities. */
              className="relative size-full flex! justify-center items-center"
            >
              <div className="size-full relative">
                <picture className="absolute w-full h-full">
                  <source media="(min-width: 1024px)" srcSet={item.image} />
                  <source media="(min-width: 768px)" srcSet={item.image} />
                  <source media="(min-width: 320px)" srcSet={mobileSrc(item.image)} />
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="object-cover absolute w-full h-full"
                  />
                </picture>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {data.data.map((item, index) => (
          <div
            key={item.id}
            className="absolute bottom-40 md:bottom-[1.25rem] inset-x-6 z-2 h-full flex flex-col justify-end items-center transition-all duration-500 pointer-events-none"
          >
            <div>
              <div
                className={cn(
                  "text-[0.28rem] md:text-2xl opacity-50 pointer-events-auto text-center duration-500",
                  index === activeIndex
                    ? "animate-in fade-in slide-in-from-bottom"
                    : "animate-out fade-out slide-out-to-top fill-mode-forwards",
                )}
              >
                {item.title}
              </div>
            </div>
          </div>
        ))}
        <div
          ref={prevRef}
          className="prev-btn flex cursor-pointer absolute top-1/2 -translate-y-1/2 transition-all duration-300 left-12 md:left-20 z-9 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed bg-white/10 hover:bg-white/30 rounded-full"
        >
          <ArrowIcon className="size-[0.54rem] text-white rtl:rotate-180" />
        </div>
        <div
          ref={nextRef}
          className="next-btn flex cursor-pointer absolute top-1/2 -translate-y-1/2 transition-all duration-300 right-12 md:right-20 z-9 [&.swiper-button-disabled]:opacity-30 [&.swiper-button-disabled]:cursor-not-allowed bg-white/10 hover:bg-white/30 rounded-full"
        >
          <ArrowIcon className="size-[0.54rem] rotate-180 text-white rtl:rotate-0" />
        </div>
      </div>
    </div>
  );
}

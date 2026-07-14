"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { cn } from "@/lib/utils";
import type { VideoItem } from "@/types/vehicle";

import "swiper/css";
import "swiper/css/free-mode";

interface VideoSwiperProps {
  data: VideoItem[];
}

export function VideoSwiper({ data }: VideoSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex((current) => {
      if (current === index) return current;
      const el = videoRef.current;
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
      return index;
    });
  }, []);

  useEffect(() => {
    // A <video> keeps playing/buffering its previous source until load() makes
    // it re-read the changed src attribute.
    videoRef.current?.load();
  }, [activeIndex]);

  const active = data[activeIndex];

  if (!active) {
    return null;
  }

  return (
    <section className="relative flex h-svh w-full flex-col overflow-hidden bg-black pt-60 pb-40 text-white md:pt-[1.88rem] md:pb-[0.3rem]">
      <div className="shrink-0 px-12 md:px-15">
        <h2 className="text-center text-[0.6rem] leading-none font-medium font-display">
          {data[0].title}
        </h2>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-12 py-30 md:px-15 md:py-[0.3rem]">
        <video
          ref={videoRef}
          src={active.video}
          poster={active.image}
          controls
          playsInline
          preload="none"
          className="h-full w-full rounded-[0.04rem] bg-black object-contain"
        />
      </div>

      <div className="shrink-0 px-12 md:px-15">
        <Swiper
          modules={[FreeMode]}
          slidesPerView="auto"
          // Swiper parseFloat()s a non-% spaceBetween into raw pixels, which
          // would not track the rem canvas; the gap is slide padding instead.
          spaceBetween={0}
          freeMode
          watchSlidesProgress
          className="w-full"
        >
          {data.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={item.video} className="h-auto! w-[3rem]! pr-12 md:w-[2.56rem]! md:pr-4">
                <button
                  type="button"
                  onClick={() => handleSelect(index)}
                  aria-current={isActive}
                  className={cn(
                    "block w-full cursor-pointer text-left transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-45 hover:opacity-75",
                  )}
                >
                  <div
                    className={cn(
                      "w-full overflow-hidden rounded-[0.04rem] border transition-colors duration-300",
                      isActive ? "border-brand-lime" : "border-white/20",
                    )}
                  >
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      className="aspect-video w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 line-clamp-2 text-[0.2rem] leading-snug md:mt-2 md:text-sm">
                    {item.title}
                  </div>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper/types";
import "swiper/css";

import { CarSwiper } from "@/components/vehicles/CarSwiper";
import { FirstScreen } from "@/components/vehicles/FirstScreen";
import { Introduction } from "@/components/vehicles/Introduction";
import { Introduction1 } from "@/components/vehicles/Introduction1";
import { Introduction2 } from "@/components/vehicles/Introduction2";
import { ThreeDHall } from "@/components/vehicles/ThreeDHall";
import { VideoSwiper } from "@/components/vehicles/VideoSwiper";
import type { VehicleSection } from "@/types/vehicle";

interface VehicleTemplateProps {
  sections: VehicleSection[];
}

/**
 * The target advances this swiper from a custom wheel handler rather than
 * Swiper's mousewheel module (its own params have `mousewheel.enabled: false`
 * and `allowTouchMove: false`). Document scroll does not drive it either — the
 * page is only ~1353px tall and `activeIndex` stays at 0 at maximum scroll.
 *
 * The live handler's threshold and debounce could not be measured: synthetic
 * wheel events don't advance it, so it appears to require a trusted event.
 * These values are matched to the 1000ms slide transition and tuned by eye.
 */
const SLIDE_SPEED = 1000;
const WHEEL_THRESHOLD = 8;

function renderSection(section: VehicleSection, active: boolean) {
  switch (section.id) {
    case "firstScreen":
      return <FirstScreen data={section.data} />;
    case "3dHall":
      return <ThreeDHall data={section.data} active={active} />;
    case "carSwiper":
      return <CarSwiper data={section.data} />;
    case "introduction1":
      return <Introduction1 data={section.data} />;
    case "introduction":
      return <Introduction data={section.data} />;
    case "videoSwiper":
      return <VideoSwiper data={section.data} />;
    case "introduction2":
      return <Introduction2 data={section.data} />;
  }
}

export function VehicleTemplate({ sections }: VehicleTemplateProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const lockedUntil = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const now = Date.now();
    if (now < lockedUntil.current) return;
    if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

    const down = event.deltaY > 0;
    // Let the document take over past the last slide so the footer is
    // reachable, and at the top of the first slide when scrolling back up.
    if (down && swiper.isEnd) return;
    if (!down && swiper.isBeginning && window.scrollY === 0) return;

    if (down) swiper.slideNext();
    else swiper.slidePrev();
    lockedUntil.current = now + SLIDE_SPEED;
  }, []);

  return (
    <div className="w-full min-h-svh">
      <div className="sticky top-0 home-swiper w-full h-svh" onWheel={handleWheel}>
        <Swiper
          className="swiper-container w-full h-svh"
          direction="vertical"
          slidesPerView={1}
          speed={SLIDE_SPEED}
          allowTouchMove={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onActiveIndexChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {sections.map((section, index) => (
            <SwiperSlide key={`${section.id}-${index}`} className="relative">
              {renderSection(section, index === activeIndex)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

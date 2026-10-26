"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { CarSwiper } from "@/components/vehicles/CarSwiper";
import { FirstScreen } from "@/components/vehicles/FirstScreen";
import { Introduction } from "@/components/vehicles/Introduction";
import { Introduction1 } from "@/components/vehicles/Introduction1";
import { Introduction2 } from "@/components/vehicles/Introduction2";
import { LaunchBrief } from "@/components/vehicles/LaunchBrief";
import { PlugInHybrid } from "@/components/vehicles/PlugInHybrid";
import { ThreeDHall } from "@/components/vehicles/ThreeDHall";
import { VideoSwiper } from "@/components/vehicles/VideoSwiper";
import type { VehicleSection } from "@/types/vehicle";

interface VehicleTemplateProps {
  sections: VehicleSection[];
}

function renderSection(section: VehicleSection) {
  switch (section.id) {
    case "firstScreen":
      return <FirstScreen data={section.data} />;
    case "launchBrief":
      return <LaunchBrief data={section.data} />;
    case "3dHall":
      // Pins and scrubs itself against scroll; see ThreeDHall.
      return <ThreeDHall data={section.data} />;
    case "carSwiper":
      return <CarSwiper data={section.data} />;
    case "plugInHybrid":
      return <PlugInHybrid data={section.data} />;
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

/** The 3dHall pins itself over a long scroll, so it opts out of the shared reveal. */
const SELF_DRIVEN = new Set<VehicleSection["id"]>(["3dHall"]);

export function VehicleTemplate({ sections }: VehicleTemplateProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-reveal]");

      panels.forEach((panel) => {
        const targets = panel.querySelectorAll("[data-reveal-item]");
        if (targets.length === 0) return;

        gsap.from(targets, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: panel,
            start: "top 70%",
            // Replays on re-entry, matching the target's `once: false` reveals.
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full">
      {sections.map((section, index) => (
        <section
          key={`${section.id}-${index}`}
          className="relative w-full"
          {...(SELF_DRIVEN.has(section.id) ? {} : { "data-reveal": "" })}
        >
          {renderSection(section)}
        </section>
      ))}
    </div>
  );
}

/* eslint-disable @next/next/no-img-element -- large studio/scene photos; next/image
   would re-run its loader per frame and fight the rem-scaled layout. */
import type { Metadata } from "next";
import Link from "next/link";

import { J5ColorPicker } from "@/components/jaecoo/J5ColorPicker";
import { J5Slider } from "@/components/jaecoo/J5Slider";
import { J5Viewer } from "@/components/jaecoo/J5Viewer";
import { Reveal } from "@/components/jaecoo/Reveal";

export const metadata: Metadata = {
  title: "Jaecoo J5 — Bold, Premium, All-Electric SUV | JSW Motors India",
  description:
    "The Jaecoo J5 is a fully electric premium SUV — bold design, a silent glass cabin and striking alloys, built for every adventure.",
};

const ADVENTURE_SLIDES = [
  {
    image: "/jaecoo-j5/gallery-1.webp",
    title: "Adventure starts here",
    specs: [
      "Powerful yet Elegant Design",
      "540° all-terrain view, independent suspension from entry level",
      "20°/30° approach/departure angle (better than Discovery Sport)",
    ],
  },
  {
    image: "/jaecoo-j5/gallery-2.webp",
    title: "Adventure starts here",
    specs: [
      "Best-in-class 1.45㎡ panoramic sunroof",
      "19 ADAS features, elegant column-mounted gear shifter",
      "1492mm second-row seating width",
    ],
  },
  {
    image: "/jaecoo-j5/gallery-3.webp",
    title: "Adventure starts here",
    specs: [
      "Up to 500 km of all-electric range",
      "30–80% fast charge in around 20 minutes",
      "15.6-inch high-definition central touchscreen",
    ],
  },
  {
    image: "/jaecoo-j5/gallery-4.webp",
    title: "Adventure starts here",
    specs: [
      "Eight airbags and a five-star safety pedigree",
      "50:50 weight distribution for balanced handling",
      "Immersive Sony premium audio system",
    ],
  },
  {
    image: "/jaecoo-j5/gallery-5.webp",
    title: "Adventure starts here",
    specs: [
      "Zero-emission electric drivetrain",
      "Vehicle-to-load (V2L) power for the outdoors",
      "Seven-year warranty for total peace of mind",
    ],
  },
];

export default function JaecooJ5Page() {
  return (
    <main className="w-full bg-[#f6f6f6] text-[#1a1a1a]">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative w-full h-svh min-h-[6rem] overflow-hidden">
        <img src="/jaecoo-j5/hero.jpg" alt="Jaecoo J5 electric SUV" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

        <div className="relative mx-auto flex h-full max-w-[19.2rem] flex-col items-center px-12 md:px-[0.7rem] pt-32 md:pt-[1.4rem] pb-16 md:pb-[0.8rem] text-white text-center">
          <Reveal className="flex flex-col items-center gap-6 md:gap-[0.2rem]">
            <span className="font-mono uppercase tracking-[0.24em] text-sm md:text-[0.13rem] text-white/80">
              Jaecoo J5 Electric
            </span>
          </Reveal>

          <div className="flex-1" />

          <Reveal className="w-full flex flex-col items-center gap-10 md:gap-[0.4rem]" delay={120}>
            <h1 className="max-w-[11rem] font-display text-3xl md:text-[0.56rem] leading-[1.1] font-medium">
              Go further, fully electric. The Jaecoo J5 is built for every adventure.
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-[0.16rem]">
              <Link
                href="/register"
                className="inline-flex items-center h-14 md:h-[0.56rem] px-8 md:px-[0.34rem] rounded-full bg-white text-black text-base md:text-[0.16rem] font-medium transition-transform duration-300 hover:scale-105"
              >
                Register interest
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Exterior / Interior viewer ─────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-12 md:px-[0.7rem] py-24 md:py-[1rem]">
          <Reveal className="text-center">
            <span className="font-mono uppercase tracking-[0.24em] text-sm md:text-[0.13rem] text-[#6b9b37]">
              Technological design
            </span>
            <h2 className="mt-6 md:mt-[0.24rem] mx-auto max-w-[11rem] font-display text-3xl md:text-[0.44rem] leading-[1.15] font-medium">
              Mountain-inspired design, intelligent electric power
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12 md:mt-[0.5rem]">
            <J5Viewer />
          </Reveal>
        </div>
      </section>

      {/* ── Colour picker ──────────────────────────────────────── */}
      <section className="w-full bg-[#f6f6f6]">
        <div className="mx-auto max-w-[19.2rem] px-12 md:px-[0.7rem] py-24 md:py-[1rem]">
          <Reveal>
            <h2 className="mx-auto max-w-[12rem] text-center font-display text-3xl md:text-[0.4rem] leading-[1.15] font-medium">
              Designed to conquer every road, in the shade that fits your vibe
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12 md:mt-[0.5rem]">
            <J5ColorPicker />
          </Reveal>
        </div>
      </section>

      {/* ── Adventure starts here (scroll-driven slider) ───────── */}
      <section className="w-full bg-white">
        {/* Full-bleed, sits outside any transformed ancestor so the sticky
            panel inside can track the scroll. Each card carries its own
            "Adventure starts here" title and spec bullets. */}
        <J5Slider slides={ADVENTURE_SLIDES} />
      </section>

      {/* ── New crossover ──────────────────────────────────────── */}
      <section className="w-full bg-[#f6f6f6]">
        <div className="mx-auto max-w-[19.2rem] px-12 md:px-[0.7rem] py-24 md:py-[1rem]">
          <Reveal>
            <h2 className="text-center font-display text-3xl md:text-[0.44rem] leading-none font-medium">
              New Jaecoo J5 EV crossover
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-12 md:mt-[0.5rem] overflow-hidden rounded-[0.16rem]">
            <img src="/jaecoo-j5/crossover.jpg" alt="Jaecoo J5 driving on an open road" className="w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* ── Register interest CTA ──────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-12 md:px-[0.7rem] py-24 md:py-[1.4rem] flex justify-center">
          <Reveal>
            <Link
              href="/register"
              className="inline-flex items-center h-14 md:h-[0.7rem] px-10 md:px-[0.5rem] rounded-full bg-black text-white text-base md:text-[0.2rem] font-medium transition-opacity duration-300 hover:opacity-85"
            >
              Register your interest
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

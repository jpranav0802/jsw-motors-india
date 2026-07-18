/* eslint-disable @next/next/no-img-element -- large studio/scene photos swapped as
   raw <img>; next/image would re-run its loader and fight the rem-scaled layout. */
import type { Metadata } from "next";
import Link from "next/link";

import { V23Carousel } from "@/components/v23/V23Carousel";
import { V23ColorPicker } from "@/components/v23/V23ColorPicker";

export const metadata: Metadata = {
  title: "V23 — Retro-stylish Electric City Car | JSW Motors India",
  description:
    "The JSW V23 is a 100% electric, retro-style boxy city car — 211 PS, 430 km NEDC range and 2WD & 4WD, built to match your journey and your style.",
};

const STATS = [
  { icon: "/v23/icon-power.png", label: "Maximum power (PS)", value: "211" },
  { icon: "/v23/icon-torque.png", label: "Maximum torque (Nm)", value: "292" },
  { icon: "/v23/icon-range.png", label: "Maximum Range (NEDC)", value: "430 km" },
  { icon: "/v23/icon-drivetrain.png", label: "Drivetrain", value: "2WD & 4WD" },
  { icon: "/v23/icon-accel.png", label: "Acceleration (0-100 km/h)", value: "7.5 s" },
];

export default function V23Page() {
  return (
    <main className="w-full bg-white text-black">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative w-full h-[88vh] min-h-[5.6rem] overflow-hidden pt-[1.0rem] md:pt-[0.75rem]">
        {/* Cinematic theme video plays behind the card (poster paints instantly). */}
        <video
          src="/v23/theme.mp4"
          poster="/v23/hero.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative mx-auto h-full max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem]">
          <div className="absolute left-12 md:left-[0.7rem] top-1/2 -translate-y-1/2 w-full max-w-[4rem] md:max-w-[5rem] rounded-[0.1rem] bg-white/55 backdrop-blur-md p-[0.32rem] md:p-[0.4rem] shadow-[0_0.1rem_0.6rem_rgba(0,0,0,0.12)]">
            <div className="font-display text-[0.5rem] md:text-[0.44rem] leading-none">V23</div>
            <h1 className="mt-[0.1rem] md:mt-[0.14rem] font-display text-[0.28rem] md:text-[0.28rem] leading-[1.2] font-medium uppercase text-black/70">
              The retro-stylish, boxy electric city car
            </h1>
            <p className="mt-[0.14rem] md:mt-[0.2rem] text-[0.22rem] md:text-[0.17rem] leading-relaxed text-black/70">
              Bring joy to every ride in the JSW V23 — a 100% electric retro-style car with a bold
              BOXY design, built to match your journey and your style.
            </p>
          </div>
        </div>
      </section>

      {/* ── Spec strip ─────────────────────────────────────────── */}
      <section className="w-full bg-gradient-to-b from-[#33333a] to-[#0d0d10] text-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-14 md:py-[0.56rem]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-x-[0.4rem] md:gap-y-[0.5rem]">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-5 md:gap-[0.2rem]">
                <img src={s.icon} alt="" className="size-14 md:size-[0.56rem] object-contain shrink-0" />
                <div>
                  <div className="text-[0.24rem] md:text-[0.14rem] text-white/70">{s.label}</div>
                  <div className="font-display text-[0.5rem] md:text-[0.28rem] leading-tight">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Play hard, relax more ──────────────────────────────── */}
      <section className="w-full bg-gradient-to-b from-[#bdb4a3] to-[#ded7ca]">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem] grid gap-12 md:gap-[0.6rem] md:grid-cols-2 items-center">
          <V23Carousel
            images={["/v23/interior-1.jpg", "/v23/interior-2.jpg", "/v23/interior-3.jpg"]}
            aspect="aspect-[1473/1177]"
          />
          <div>
            <h2 className="font-display text-[0.6rem] md:text-[0.46rem] leading-[1.05] font-medium uppercase text-[#4a4640]">
              Play hard, relax more
            </h2>
            <p className="mt-[0.3rem] md:mt-[0.24rem] text-[0.3rem] md:text-[0.18rem] leading-relaxed text-[#5b564e] max-w-[5.4rem]">
              Enjoy wide-open visibility, a high-roof design, and practical features that make every
              drive more enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* ── Unique boxy design ─────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem]">
          <h2 className="font-display text-[0.6rem] md:text-[0.46rem] leading-none font-medium uppercase text-center">
            Unique boxy design
          </h2>
          <div className="mt-[0.6rem] md:mt-[0.5rem] overflow-hidden rounded-[0.12rem]">
            <img src="/v23/boxy.jpg" alt="JSW V23 in a studio, three-quarter front view" className="w-full object-cover" />
          </div>
          <div className="mt-[0.4rem] md:mt-[0.3rem] flex flex-col items-end">
            <span className="text-[0.24rem] md:text-[0.16rem] text-black/50">Dimensions (L x W x H) (mm)</span>
            <span className="font-display text-[0.5rem] md:text-[0.3rem] leading-tight">4220 x 1915 x 1845</span>
          </div>
        </div>
      </section>

      {/* ── Safety / ADAS ──────────────────────────────────────── */}
      <section className="w-full bg-[#efece7]">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem]">
          <img
            src="/v23/adas.jpg"
            alt="V23 Safety — 12 Advanced Driver Assistance Systems: Adaptive Cruise Control, Auto Emergency Braking, Blind Spot Detection, Lane Keeping Assist and more"
            className="w-full rounded-[0.12rem] object-contain"
          />
        </div>
      </section>

      {/* ── Pick the shade ─────────────────────────────────────── */}
      <section className="w-full bg-gradient-to-b from-[#c3baa9] to-[#e7e1d5]">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem] text-center">
          <h2 className="font-display text-[0.5rem] md:text-[0.34rem] leading-snug font-medium uppercase text-[#4a4640] max-w-[10rem] mx-auto">
            Pick the shade that fits your vibe and makes every drive uniquely yours
          </h2>
          <V23ColorPicker />
        </div>
      </section>

      {/* ── Moments gallery ────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem]">
          <h2 className="font-display text-[0.6rem] md:text-[0.46rem] leading-none font-medium uppercase">
            Moments gallery
          </h2>
          <div className="mt-[0.6rem] md:mt-[0.5rem]">
            <V23Carousel
              images={[
                "/v23/color-104.jpg",
                "/v23/color-109.jpg",
                "/v23/color-110.jpg",
                "/v23/color-107.jpg",
                "/v23/color-108.jpg",
              ]}
              aspect="aspect-[16/9]"
            />
          </div>
        </div>
      </section>

      {/* ── Register CTA (ties the model into our site) ────────── */}
      <section className="w-full bg-neutral-950 text-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.0rem] md:py-[0.9rem] flex flex-col items-center text-center gap-[0.36rem] md:gap-[0.3rem]">
          <h2 className="font-display text-[0.6rem] md:text-[0.42rem] leading-tight font-medium uppercase">
            Be first in line for the V23
          </h2>
          <p className="text-[0.3rem] md:text-[0.18rem] text-white/60 max-w-[6.4rem]">
            Register your interest and we&apos;ll keep you posted as the V23 nears its India launch.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center h-[1.0rem] md:h-[0.56rem] px-[0.4rem] md:px-[0.36rem] bg-brand-lime text-black text-[0.3rem] md:text-[0.17rem] font-medium rounded-[0.04rem] transition-opacity duration-300 hover:opacity-85"
          >
            Register your interest
          </Link>
        </div>
      </section>
    </main>
  );
}

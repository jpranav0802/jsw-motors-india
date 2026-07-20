/* eslint-disable @next/next/no-img-element -- full-bleed studio/scene photos; next/image
   would re-run its loader and fight the rem-scaled layout, as on the other model pages. */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { T2LogoIcon } from "@/components/icons";
import { Reveal } from "@/components/jaecoo/Reveal";

interface HybridPageProps {
  // Next 16: dynamic params arrive as a promise and must be awaited.
  params: Promise<{ vehicle: string }>;
}

/** Only the T2 carries a plug-in hybrid page for now. */
const HYBRID_MODELS = ["T2"];

export function generateStaticParams() {
  return HYBRID_MODELS.map((vehicle) => ({ vehicle }));
}

export const metadata: Metadata = {
  title: "Jetour T2 Plug-in Hybrid | JSW Motors India",
  description:
    "The Jetour T2 Super Hybrid pairs a 1.5T Kunpeng engine with an electric drive unit for pure-electric commuting, long combined range and full off-road XWD capability.",
};

const STATS = [
  { value: "100 km", label: "Pure-electric range (expected)" },
  { value: "1,200 km", label: "Combined range (expected)" },
  { value: "~20 min", label: "Fast charge 30–80%" },
  { value: "XWD", label: "Intelligent four-wheel drive" },
];

const FEATURES = [
  {
    title: "Kunpeng Super Hybrid",
    body: "A 1.5T Kunpeng engine works with a dedicated electric drive unit and a high-voltage battery, switching seamlessly between pure-electric, hybrid and engine-direct drive to keep you moving with explosiveness on the climb and endurance on the long way home.",
  },
  {
    title: "Electric-first, everywhere",
    body: "Run the daily commute on battery alone with zero tailpipe emissions, then let the engine step in for the long haul — no range anxiety, no compromise on the trail.",
  },
  {
    title: "Charge on your terms",
    body: "Top up overnight at home or take the battery from 30% to 80% in around twenty minutes at a fast charger, so a coffee stop is all it takes to get moving again.",
  },
  {
    title: "Hardcore capability, kept intact",
    body: "The hybrid drivetrain pairs with XWD — fully automatic switching between 2WD and 4WD — and the T2's 6+X driving modes, so the Super Hybrid climbs, wades and crawls exactly like the rest of the range.",
  },
];

export default async function HybridPage({ params }: HybridPageProps) {
  const { vehicle } = await params;
  if (!HYBRID_MODELS.includes(vehicle)) notFound();

  return (
    <main className="w-full bg-white text-black">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative w-full h-svh min-h-[6rem] overflow-hidden bg-neutral-950">
        <img
          src="/images/vehicles/cars/T2/hybrid-charging.jpg"
          alt="Jetour T2 Super Hybrid charging at a roadside charging station at dusk"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.85) 100%)",
          }}
        />

        <div className="relative mx-auto flex h-full max-w-[19.2rem] flex-col justify-end px-[0.45rem] md:px-[0.7rem] pb-[1.0rem] md:pb-[0.9rem] text-white">
          <div className="flex flex-col items-start gap-[0.2rem] md:gap-[0.24rem]">
            <span className="inline-flex items-center rounded-full border border-brand-lime/60 bg-black/25 backdrop-blur-sm px-5 md:px-[0.18rem] py-1.5 md:py-[0.05rem] font-display text-xs md:text-[0.14rem] tracking-[0.22em] uppercase text-brand-lime">
              Plug-in Hybrid
            </span>
            <h1 className="font-display text-[0.7rem] md:text-[0.56rem] leading-[1.05] font-medium max-w-[10rem]">
              T2 Super Hybrid
            </h1>
            <p className="text-[0.3rem] md:text-[0.18rem] leading-relaxed text-white/70 max-w-[6.6rem]">
              Electric calm for the everyday, engine muscle for the adventure — the rugged T2, now
              with a plug.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stat strip ─────────────────────────────────────────── */}
      <section className="w-full bg-neutral-950 text-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-14 md:py-[0.6rem]">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-[0.3rem] gap-y-[0.5rem] md:gap-[0.4rem]">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-[0.1rem] md:gap-2">
                <dd className="font-display text-[0.5rem] md:text-4xl leading-none whitespace-nowrap">
                  {stat.value}
                </dd>
                <dt className="text-[0.24rem] md:text-sm text-white/60">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Overview ───────────────────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem]">
          <Reveal className="flex flex-col items-center text-center">
            <T2LogoIcon className="text-8xl" />
            <span className="mt-[0.3rem] md:mt-[0.24rem] font-mono uppercase tracking-[0.24em] text-[0.24rem] md:text-[0.13rem] text-[#6b9b37]">
              How the system works
            </span>
            <h2 className="mt-[0.3rem] md:mt-[0.24rem] mx-auto max-w-[11rem] font-display text-[0.6rem] md:text-[0.44rem] leading-[1.15] font-medium">
              Two power sources, one effortless drive
            </h2>
            <p className="mt-[0.3rem] md:mt-[0.24rem] mx-auto max-w-[7.4rem] text-[0.3rem] md:text-[0.18rem] leading-relaxed text-black/60">
              The T2 Super Hybrid drives on electricity first and calls on the Kunpeng engine only
              when you need it — for the long climb, the deep wade or the open highway. You get the
              silence and low running costs of an EV around town, with the reach and refuelling ease
              of a combustion SUV when the map runs out of chargers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Feature cards ──────────────────────────────────────── */}
      <section className="w-full bg-[#f6f6f6]">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem]">
          <div className="grid gap-[0.36rem] md:gap-[0.3rem] md:grid-cols-2">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 90}>
                <div className="h-full rounded-[0.12rem] border border-black/10 bg-white p-[0.5rem] md:p-[0.44rem]">
                  <div className="flex items-center gap-[0.16rem]">
                    <span aria-hidden className="h-[0.28rem] md:h-[0.24rem] w-[0.06rem] rounded-full bg-brand-lime" />
                    <h3 className="font-display text-[0.4rem] md:text-[0.26rem] leading-tight font-medium">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-[0.24rem] md:mt-[0.2rem] text-[0.28rem] md:text-[0.17rem] leading-relaxed text-black/60">
                    {feature.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Charging band (reuses the hero photo, framed) ──────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.2rem] md:py-[1rem]">
          <Reveal className="overflow-hidden rounded-[0.16rem]">
            <img
              src="/images/vehicles/cars/T2/hybrid-charging.jpg"
              alt="Charging the Jetour T2 Super Hybrid"
              className="w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120} className="mt-[0.4rem] md:mt-[0.3rem] flex flex-col items-end text-right">
            <span className="text-[0.24rem] md:text-[0.16rem] text-black/50">Plug in, power up</span>
            <span className="font-display text-[0.5rem] md:text-[0.3rem] leading-tight">
              Home charging &amp; DC fast charging
            </span>
          </Reveal>
        </div>
      </section>

      {/* ── Register CTA ───────────────────────────────────────── */}
      <section className="w-full bg-neutral-950 text-white">
        <div className="mx-auto max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1.0rem] md:py-[0.9rem] flex flex-col items-center text-center gap-[0.36rem] md:gap-[0.3rem]">
          <h2 className="font-display text-[0.6rem] md:text-[0.42rem] leading-tight font-medium uppercase">
            Be first to plug in
          </h2>
          <p className="text-[0.3rem] md:text-[0.18rem] text-white/60 max-w-[6.4rem]">
            Register your interest and we&apos;ll keep you posted on the T2 Super Hybrid as it nears
            its India launch.
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

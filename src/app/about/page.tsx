import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About | JSW Auto",
  description:
    "JSW Auto builds rugged adventure vehicles that pair off-road capability with everyday comfort — from the Gobi Desert to the daily commute.",
};

const PILLARS = [
  {
    title: "Capability",
    body: "XWD switches itself between 2WD and 4WD, with 6+X driving modes for snow, sediment and rock. 220mm of clearance and a steel-cage body take the terrain that punishes lesser cars.",
  },
  {
    title: "Comfort",
    body: "Capability should not cost you comfort. Ventilated seats, a dual-zone cabin and an arrayed high-density roof make the long way home the easy part.",
  },
  {
    title: "Technology",
    body: "A Snapdragon 8155 chip drives a 15.6-inch screen, up to L2 driving assistance and a 360° camera — the intelligence to make hard roads feel routine.",
  },
];

const STATS = [
  { value: "5", label: "Models" },
  { value: "2800", label: "Wheelbase (mm)" },
  { value: "6+X", label: "Driving modes" },
  { value: "220", label: "Clearance (mm)" },
];

const LINEUP = ["JSW T2", "JSW T2 i-DM", "JSW T1", "JSW T1 i-DM", "JSW G700"];

export default function AboutPage() {
  return (
    <PageShell
      title="About JSW Auto"
      intro="We build rugged adventure vehicles for people who treat the map as a suggestion."
    >
      <div className="grid gap-10 md:gap-[0.32rem] md:grid-cols-3 text-base leading-relaxed text-black/70">
        <p>
          The T2 is our hardcore adventure SUV: a 2800mm wheelbase, XWD all-wheel
          drive that switches itself between 2WD and 4WD, and a steel cage body
          built for terrain that punishes lesser cars.
        </p>
        <p>
          Every model is developed around a simple idea — capability should not
          cost you comfort. Kunpeng power delivers the explosiveness for the climb
          and the endurance for the long way home.
        </p>
        <p>
          From the Gobi Desert to the daily commute, JSW vehicles are engineered
          to make the difficult part of the journey the least interesting part of
          the story.
        </p>
      </div>

      {/* Capability pillars */}
      <section className="mt-20 md:mt-[0.8rem]">
        <h2 className="font-display text-3xl md:text-[0.32rem]">What we build for</h2>
        <div className="mt-10 md:mt-[0.32rem] grid gap-px bg-black/10 md:grid-cols-3 border border-black/10">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="bg-white p-8 md:p-[0.32rem]">
              <h3 className="font-display text-xl md:text-[0.2rem]">{pillar.title}</h3>
              <p className="mt-4 md:mt-[0.16rem] text-base leading-relaxed text-black/60">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <dl className="mt-20 md:mt-[0.8rem] grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-[0.32rem]">
        {STATS.map((stat) => (
          <div key={stat.label} className="border-t border-black pt-4 md:pt-[0.12rem]">
            <dd className="font-display text-4xl md:text-[0.4rem] leading-none">{stat.value}</dd>
            <dt className="mt-3 md:mt-[0.08rem] text-sm text-black/50">{stat.label}</dt>
          </div>
        ))}
      </dl>

      {/* Lineup */}
      <section className="mt-20 md:mt-[0.8rem]">
        <h2 className="font-display text-3xl md:text-[0.32rem]">The lineup</h2>
        <ul className="mt-8 md:mt-[0.24rem] flex flex-wrap gap-4 md:gap-[0.12rem]">
          {LINEUP.map((model) => (
            <li key={model}>
              <span className="inline-flex items-center h-16 md:h-[0.5rem] px-6 md:px-[0.2rem] border border-black/20 text-base">
                {model}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-10 md:mt-[0.32rem] text-base text-black/60">
          Ready to drive one?{" "}
          <Link href="/book" className="underline underline-offset-2 hover:text-black">
            Book a test drive
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}

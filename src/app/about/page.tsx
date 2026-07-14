import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "About | JSW Auto" };

export default function AboutPage() {
  return (
    <PageShell
      title="About JSW Auto"
      intro="We build rugged adventure vehicles for people who treat the map as a suggestion."
    >
      <div className="grid gap-10 md:gap-[0.32rem] md:grid-cols-3 text-base leading-relaxed text-black/70">
        <p>
          The T2 is our hardcore adventure SUV: a 2800mm wheelbase, XWD
          all-wheel drive that switches itself between 2WD and 4WD, and a steel
          cage body built for terrain that punishes lesser cars.
        </p>
        <p>
          Every model is developed around a simple idea — capability should not
          cost you comfort. Kunpeng power delivers the explosiveness for the
          climb and the endurance for the long way home.
        </p>
        <p>
          From the Gobi Desert to the daily commute, JSW vehicles are engineered
          to make the difficult part of the journey the least interesting part
          of the story.
        </p>
      </div>
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About | JSW Motors India",
  description:
    "JSW Motors India, a new passenger vehicle manufacturer from the JSW Group, is launching a range of new energy vehicles — starting with the Jetour T2.",
};

const LINEUP = ["Jetour T2", "Jaecoo J5", "V23"];

export default function AboutPage() {
  return (
    <PageShell title="About JSW Motors India">
      <div className="max-w-[7.2rem] space-y-6 md:space-y-[0.24rem] text-base leading-relaxed text-black/70">
        <p>
          JSW Motors is a new Indian passenger vehicle manufacturer established by
          the JSW Group. The company is launching its own brand to focus on “new
          energy vehicles” (NEVs), including electric and hybrid options, with plans
          to roll out 15 different models over a four-year period.
        </p>
        <p>
          The company is partnering with Chinese automakers, including Chery, to
          introduce Completely Knocked Down (CKD) vehicles. Their first model is
          expected to be a premium SUV, the Jetour T2, priced around Rs. 30 Lakh.
          This is expected to be followed by the Jaecoo J5 and the Chery iCAR V23
          SUVs, which will sit in the Rs. 18 Lakh–Rs. 20 Lakh bracket.
        </p>
      </div>

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
          Interested?{" "}
          <Link href="/register" className="underline underline-offset-2 hover:text-black">
            Register your interest
          </Link>
          .
        </p>
      </section>
    </PageShell>
  );
}

import type { Metadata } from "next";

import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "FAQs | JSW Auto" };

const FAQS = [
  {
    q: "What engines does the T2 offer?",
    a: "A 1.5T and a 2.0T, both Kunpeng power units, tuned for a balance of explosiveness and endurance.",
  },
  {
    q: "What is XWD?",
    a: "X Wheel Drive switches fully automatically between 2WD and 4WD, with intelligent selection across 6+X driving modes.",
  },
  {
    q: "How big is the T2?",
    a: "4785 x 2006 x 1880 mm, on a 2800mm wheelbase.",
  },
  {
    q: "Can I configure a colour before booking?",
    a: "Yes — the exterior viewer on the home page carries all six finishes, and both interior trims.",
  },
];

export default function FaqsPage() {
  return (
    <PageShell title="FAQs">
      <dl className="max-w-[7.2rem]">
        {FAQS.map((item) => (
          <div key={item.q} className="border-t border-black/10 py-8 md:py-[0.24rem]">
            <dt className="text-lg font-medium">{item.q}</dt>
            <dd className="mt-3 text-base text-black/60">{item.a}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  );
}

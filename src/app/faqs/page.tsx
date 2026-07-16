import type { Metadata } from "next";

import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "FAQs | JSW Motors India",
  description:
    "Answers to common questions about the Jetour T2 — engines, XWD, dimensions, warranty, servicing and test drives.",
};

const FAQS: FaqItem[] = [
  {
    q: "What engines does the T2 offer?",
    a: "A 1.5T and a 2.0T, both Kunpeng power units, tuned for a balance of explosiveness on the climb and endurance on the long way home. Both pair with a 7-speed DCT.",
  },
  {
    q: "What is XWD?",
    a: "X Wheel Drive switches fully automatically between 2WD and 4WD, reading grip and load so you don't have to. On 2.0T trims it works alongside 6+X driving modes — Sports, Economy, Standard, Snow, Sediment, Rock and the X Smart Mode.",
  },
  {
    q: "How big is the T2?",
    a: "4785 x 2006 x 1880 mm on a 2800mm wheelbase, with 220mm of minimum ground clearance and a 70-litre tank.",
  },
  {
    q: "Can I configure a colour before booking?",
    a: "Yes — the exterior viewer on the home page carries all six finishes, and the interior tour carries both trims. Drag to spin the car, and switch colours from the swatches.",
  },
  {
    q: "How many people does it seat?",
    a: "Five, across two rows, with a five-door body and a rear seat that reclines and folds for load space.",
  },
  {
    q: "What driver assistance is included?",
    a: "Depending on trim: ABS, EBD, ESC and TCS as standard, up to a 360° panoramic camera, blind-spot detection, adaptive cruise, lane-keeping and L2 integrated cruise assistance on the Lux.",
  },
  {
    q: "What warranty comes with the car?",
    a: "Coverage varies by market. Confirm the exact terms for your country with your local JSW dealer — the booking flow puts you in touch with the right one.",
  },
  {
    q: "How do I book a test drive?",
    a: "Use the Book page: tell us your city, the model you want to drive and a preferred date, and we'll arrange it with your nearest dealer within two working days.",
  },
  {
    q: "Where can I see the full specification?",
    a: "The T2 specification page lists every figure across all three trims — powertrain, body, chassis, safety and equipment — with a note on what's standard, optional or not offered per configuration.",
  },
];

export default function FaqsPage() {
  return (
    <PageShell
      title="FAQs"
      intro="Everything owners and shoppers ask most — search, or tap a question to open it."
    >
      <FaqAccordion items={FAQS} />
    </PageShell>
  );
}

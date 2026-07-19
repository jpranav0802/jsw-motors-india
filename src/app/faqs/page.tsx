import type { Metadata } from "next";

import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "FAQs | JSW Motors India",
  description:
    "Answers to common questions about the Jetour T2, Jaecoo J5 and JSW V23 — powertrains, range, dimensions, safety, warranty and test drives.",
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

  // ── Jaecoo J5 ─────────────────────────────────────────────
  {
    q: "What is the Jaecoo J5?",
    a: "A fully electric premium SUV — bold, mountain-inspired design, a quiet glass cabin and striking alloys, built for every adventure. It sits above the V23 as the larger, more premium electric model in the range.",
  },
  {
    q: "How far can the Jaecoo J5 go on a charge?",
    a: "Up to 500 km of all-electric range, with zero tailpipe emissions. Vehicle-to-load (V2L) lets you run equipment off the battery when you're away from a socket.",
  },
  {
    q: "How quickly does the Jaecoo J5 charge?",
    a: "Roughly 20 minutes to take the battery from 30% to 80% on a suitable fast charger — long enough for a coffee stop on a longer drive.",
  },
  {
    q: "How safe is the Jaecoo J5?",
    a: "Eight airbags and a five-star safety pedigree, backed by 19 ADAS features and a 50:50 weight distribution for balanced handling. A seven-year warranty comes with the car.",
  },
  {
    q: "What is the Jaecoo J5's cabin like?",
    a: "A 15.6-inch high-definition central touchscreen, a best-in-class 1.45㎡ panoramic sunroof, an elegant column-mounted gear shifter, 1492mm of second-row seating width and an immersive Sony premium audio system.",
  },
  {
    q: "Can the Jaecoo J5 handle rough roads?",
    a: "Yes — independent suspension from entry level, a 540° all-terrain camera view, and 20°/30° approach and departure angles, which better the Discovery Sport.",
  },

  // ── JSW V23 ───────────────────────────────────────────────
  {
    q: "What is the JSW V23?",
    a: "A 100% electric, retro-style city car with a bold boxy design — compact enough for daily city driving, styled to stand out. It's the smallest and most playful model in the range.",
  },
  {
    q: "How much power does the V23 have?",
    a: "211 PS and 292 Nm, good for 0–100 km/h in 7.5 seconds — brisk for a car of this size.",
  },
  {
    q: "What is the V23's range?",
    a: "Up to 430 km on the NEDC cycle, which covers a comfortable week of city commuting between charges for most drivers.",
  },
  {
    q: "Does the V23 come with four-wheel drive?",
    a: "Both 2WD and 4WD versions are offered, so you can pick the drivetrain that suits your roads.",
  },
  {
    q: "How big is the V23?",
    a: "4220 x 1915 x 1845 mm (L x W x H). The high-roof, boxy shape means wide-open visibility and far more headroom than the compact footprint suggests.",
  },
  {
    q: "What driver assistance does the V23 include?",
    a: "12 advanced driver assistance systems, among them adaptive cruise control, autonomous emergency braking, blind-spot detection and lane-keeping assist.",
  },
  {
    q: "Which model should I choose?",
    a: "The Jetour T2 if you want a rugged petrol SUV with genuine off-road hardware, the Jaecoo J5 if you want a long-range premium electric SUV, and the V23 if you want a compact electric city car with character. Each model page carries the full detail.",
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

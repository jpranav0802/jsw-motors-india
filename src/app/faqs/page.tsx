import type { Metadata } from "next";
import Link from "next/link";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { PageShell } from "@/components/PageShell";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs – JSW MG, ADAPT, Charging, Jetour T2, Jaecoo J5 & JSW V23",
  description:
    "In-depth answers on the JSW–MG joint venture and the ADAPT platform, expected launch and booking timelines, fast-charging in Tier 1 and Tier 2 cities, and the Jetour T2, Jaecoo J5 and JSW V23.",
  alternates: { canonical: "/faqs" },
};

const FAQS: FaqItem[] = [
  // ── The joint venture and the platform ────────────────────
  {
    q: "What is the JSW–MG joint venture, and how does the ADAPT platform work?",
    a: "JSW MG Motor India is a joint venture between India's JSW Group and MG Motor's existing Indian operation, formed to build and sell new-energy vehicles locally rather than import them. ADAPT is the multi-powertrain architecture underneath the resulting lineup. Rather than developing one platform for combustion cars and a separate skateboard for electric ones, a single body structure is engineered so the underfloor cavity can carry a full battery pack, a smaller pack alongside a fuel tank and exhaust, or a range-extender setup. The crash structure, suspension hard points and seating positions stay common, so battery-electric, plug-in hybrid and range-extender versions can be built on the same line and the mix adjusted as Indian demand actually moves.",
  },
  {
    q: "What does a multi-powertrain platform cost the buyer?",
    a: "Flexibility is not free. A body engineered to also accept an engine, an exhaust and a fuel tank is heavier and less packaging-efficient than a purpose-built electric skateboard. In practice the pure-electric version of a flexible platform gives up a little to a dedicated EV rival: a marginally higher floor, usually no front boot, and slightly worse efficiency for the same battery capacity. What you get in exchange is choice — the ability to buy the same car as a plug-in hybrid if your building has no charging point, or as a battery EV if it does. In a large SUV that packaging penalty is easily absorbed, which is why flexible architectures appear in bigger vehicles first.",
  },
  {
    q: "What is the difference between a plug-in hybrid and a range-extender?",
    a: "In a plug-in hybrid the engine can drive the wheels directly as well as charge the battery, so the car switches between electric, engine and combined operation depending on speed and load. In a range-extender the wheels are only ever driven electrically; the engine exists solely to generate current. The practical difference shows up on highways. A range-extender drives like an EV in all conditions — no gearshifts, no torque handover — but burns more fuel at a steady 100 km/h because it is doing an extra energy conversion. A well-sorted plug-in hybrid is more efficient on long runs and slightly less seamless in town.",
  },

  // ── Launch, booking and buying ────────────────────────────
  {
    q: "What is the expected launch timeline and booking process for the upcoming EV models?",
    a: "Launch timing in this segment slips routinely, so treat any date as intent rather than commitment. As of August 2026 the Jetour T2 is the closest to Indian showrooms, with the Jaecoo J5 and JSW V23 following. Bookings for new models in India typically open two to six weeks before price announcement, through authorised dealers or the manufacturer's own site, against a refundable token amount. Deliveries begin after the price announcement and are usually allocated in booking order by variant and colour. This site takes no bookings and holds no deposits — we are an independent portal, and any page asking you for pre-booking money is not us.",
  },
  {
    q: "Should I book before prices are announced?",
    a: "Booking early secures a place in the delivery queue but commits you before you know the price, the final India specification or the warranty terms. For a genuinely supply-constrained launch that trade can be worth it. For most launches it is not, because the queue moves faster than early buyers expect and cancellations are common once prices land. If you do book early, confirm three things in writing: that the token is fully refundable, that your allocation is not tied to a particular variant, and that you can change variant after the price announcement without losing your place.",
  },
  {
    q: "How do I get the state road-tax exemption applied?",
    a: "Road tax is a state subject, and several states waive it entirely on battery electric vehicles while excluding plug-in hybrids. The waiver is normally applied by the RTO at registration rather than reimbursed later, so it should appear as a zero or reduced line on your on-road price breakup. Ask the dealer for that breakup in writing before paying, and check your state's current EV policy notification yourself — many carry expiry dates, price caps or unit caps that dealers do not always track. On a ₹25 lakh car the difference is often between ₹1.5 and ₹3 lakh, which is larger than several years of running-cost savings.",
  },

  // ── Charging ──────────────────────────────────────────────
  {
    q: "How does fast-charging infrastructure in Tier 1 vs Tier 2 Indian cities support these vehicles?",
    a: "Tier 1 cities are effectively solved. Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune and Chennai have enough DC density that a broken or occupied charger is an inconvenience rather than a problem, and multiple operators compete on the same corridors. Tier 2 cities are a different picture: coverage exists, but often as one or two units per city with no redundancy, frequently on constrained supplies that deliver well below their rated output, and with uptime that varies sharply by operator. The practical consequence is that a Tier 1 owner can treat public charging as a convenience, while a Tier 2 owner should plan around a home or workplace AC point as the primary method and treat DC as a travel tool.",
  },
  {
    q: "Can I own an electric car without a home charging point?",
    a: "You can, but it changes the economics completely. Charged at home on a domestic or EV tariff, an electric car runs at roughly ₹1.20–1.50 per kilometre. Relying entirely on public DC charging at ₹18–24 per unit, the same car runs at ₹3.50–4.00 — comparable to a petrol car, with the added cost of your time. Public-only ownership is genuinely workable in a metro with high charger density; it is much harder anywhere else. Before choosing between an electric car and a plug-in hybrid, settle the home charging question first, because it decides the answer more than any specification does.",
  },
  {
    q: "How long does charging actually take?",
    a: "On a 60 kWh pack as a reference: the portable cable supplied with most cars runs at about 3.3 kW and adds roughly 18–20 km of range per hour, which is around 150–200 km overnight. A 7.4 kW home wall box roughly doubles that, taking the pack from 20% to 90% in six to seven hours. A 60 kW public DC unit does 20% to 80% in about 40–50 minutes, and a 120 kW unit can do it in under 30 if the car accepts that rate and the pack is at a good temperature. In peak Indian summer, add roughly fifteen minutes to any DC estimate — both the car and the charger derate in heat.",
  },
  {
    q: "What should I know about charging in an apartment building?",
    a: "Delhi and several other states have issued rules and model bye-laws intended to make charging points in group housing straightforward, but the outcome still depends on your resident welfare association. Objections cluster around fire risk, use of common electricity, and who pays for wiring upgrades. The approach that works is procedural: apply in writing, cite the relevant state EV policy provision, propose a separate sub-meter so your consumption is unambiguously yours, and attach a quotation from an authorised installer specifying an earth-leakage device. Framed as a metered, professionally installed, individually billed connection, most objections lose their footing before they are raised.",
  },
  {
    q: "How should I charge to protect the battery in Indian heat?",
    a: "Heat matters more than charging speed. A pack sitting at 45°C in an open parking lot degrades several times faster than the same pack at 25°C, so shaded or basement parking is the single highest-value habit an Indian EV owner can adopt. After that, chemistry decides routine: LFP packs tolerate — and periodically need — a full charge, while NMC packs prefer being kept near 80% for daily use and taken to 100% only before long drives. Charge at night when ambient temperature is lower, schedule the charge to finish close to departure rather than at midnight, and precondition the cabin while still plugged in.",
  },

  // ── Jetour T2 ─────────────────────────────────────────────
  {
    q: "What engines does the Jetour T2 offer, and what is XWD?",
    a: "The T2 uses Chery's Kunpeng power units — a 1.5T and a 2.0T — both driving through a 7-speed dual-clutch transmission. XWD, or X Wheel Drive, is an automatic all-wheel-drive system that switches between two- and four-wheel drive on its own by reading grip and load, rather than waiting for the driver to select a transfer case. On 2.0T trims it works alongside 6+X driving modes: Sports, Economy, Standard, Snow, Sediment, Rock and an X Smart mode that chooses for you. It is fast-acting and requires nothing of the driver, but it is not a substitute for a low-range transfer case on slow technical terrain.",
  },
  {
    q: "Is the Jetour T2 a genuine off-roader?",
    a: "It depends what you mean by off-road. The T2 is a monocoque SUV with 220 mm of ground clearance and an automatic all-wheel-drive system with terrain modes, measuring 4,785 x 2,006 x 1,880 mm on a 2,800 mm wheelbase. That combination handles bad hill roads, forest tracks, wet grass, sand at moderate speed and steep loose gravel without complaint, and it rides far better on tarmac than any ladder-frame rival. What it will not do comfortably is slow-speed rock crawling, deeply rutted articulation or repeated recovery work — those need a separate chassis, a low range and mechanical locking. For the 98% of driving that is road, the monocoque is the better companion.",
  },
  {
    q: "Where can I see the T2's full specification?",
    a: "The specification page lists every figure across all three trims — powertrain, body, chassis, safety and equipment — with a note on what is standard, optional or unavailable per configuration, and it now carries a written overview, a competitor comparison table and an objective pros-and-cons assessment alongside the raw data. Bear in mind that specification tables published before an India launch reflect the manufacturer's global or home-market figures; India-specific trims, equipment and homologated numbers can differ. We update the page when official Indian figures are released and mark what has changed.",
  },

  // ── Jaecoo J5 ─────────────────────────────────────────────
  {
    q: "What is the Jaecoo J5, and how far does it go on a charge?",
    a: "The J5 is a fully electric premium SUV positioned above the V23 in the range — a quiet glass cabin, mountain-inspired styling and a claimed all-electric range of up to 500 km, with vehicle-to-load so you can run equipment off the battery away from a socket. Treat 500 km as an upper bound on a favourable test cycle; realistic Indian mixed-use range on a pack of that size is meaningfully lower, and highway running at 100 km/h with the air conditioning working will be lower again. Fast charging is quoted at roughly twenty minutes from 30% to 80% on a suitable DC unit.",
  },
  {
    q: "How safe and well-equipped is the Jaecoo J5?",
    a: "The J5 is specified with eight airbags, a five-star safety pedigree, 19 ADAS functions and a 50:50 weight distribution, backed by a seven-year warranty. Inside there is a 15.6-inch central touchscreen, a 1.45㎡ panoramic sunroof, a column-mounted gear selector, 1,492 mm of second-row seating width and a Sony premium audio system. On rougher surfaces it has independent suspension from entry level, a 540° all-terrain camera view and 20°/30° approach and departure angles. As with every unlaunched model on this site, India-specific equipment levels and safety ratings should be confirmed against the homologated Indian specification when it is published.",
  },

  // ── JSW V23 ───────────────────────────────────────────────
  {
    q: "What is the JSW V23, and what will it really do on Indian roads?",
    a: "The V23 is a 100% electric, retro-styled boxy city car — 4,220 x 1,915 x 1,845 mm — with 211 PS, 292 Nm, 0–100 km/h in 7.5 seconds, and both two- and four-wheel-drive versions. The claimed maximum range is 430 km on the NEDC cycle, which is the most optimistic of the common cycles. A realistic Indian expectation is roughly 300–340 km in mixed city use on the two-wheel-drive version, and closer to 240–270 km at a sustained 100 km/h with the air conditioning working in summer. The four-wheel-drive version trades roughly 8–10% of that for traction.",
  },
  {
    q: "Which of the three models should I choose?",
    a: "Choose the Jetour T2 if you want a large, comfortable SUV with genuine all-weather traction and are content that its off-road ability stops short of a ladder-frame vehicle's. Choose the Jaecoo J5 if you want a long-range premium electric SUV and have reliable charging access, since its case rests on running an electric car as your main vehicle. Choose the V23 if your driving is mostly urban, you charge at home, and you would rather own something that looks like nothing else on the road. Each model page carries the full specification, a written overview and a comparison against its direct rivals.",
  },
  {
    q: "How accurate are the figures on this site?",
    a: "Specifications come from manufacturer material, published technical documentation and public filings, and we say which. Where a figure is a manufacturer claim on a particular test cycle we name the cycle, because NEDC, MIDC and WLTP are not interchangeable. Where a number is our own estimate — real-world range, expected pricing, likely battery chemistry — it is labelled as an estimate with the reasoning shown, so you can disagree with the assumption rather than the conclusion. Nothing about an unlaunched car is confirmed until the manufacturer homologates it in India. If you find an error, email the editor with a source and we will correct it in place.",
  },
];

/**
 * FAQPage structured data. Search engines use it for rich results, and it also
 * forces the answers to be substantive — a one-line answer looks obviously thin
 * once it is marked up as one.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  url: `${siteUrl}/faqs`,
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FaqsPage() {
  return (
    <PageShell
      title="FAQs"
      intro="The questions we are asked most, answered properly — the JSW–MG joint venture and the ADAPT platform, launch and booking timelines, charging in Tier 1 and Tier 2 cities, and each model in the range."
    >
      <script
        type="application/ld+json"
        // Static, author-controlled object — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <FaqAccordion items={FAQS} />

      <div className="mt-[0.8rem] md:mt-[0.5rem] max-w-[8.4rem] space-y-[0.3rem] md:space-y-[0.2rem]">
        <p className="text-[0.28rem] md:text-base text-black/60">
          Still unanswered? The{" "}
          <Link href="/guides" className="underline underline-offset-2 hover:text-black">
            EV guides
          </Link>{" "}
          go further on charging costs, battery care and state incentives, or you can{" "}
          <Link href="/contact" className="underline underline-offset-2 hover:text-black">
            write to the editor
          </Link>
          .
        </p>
        <AffiliationNotice />
      </div>
    </PageShell>
  );
}

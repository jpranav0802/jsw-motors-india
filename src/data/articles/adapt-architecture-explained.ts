import type { Article } from "@/types/article";

export const adaptArchitectureExplained: Article = {
  slug: "adapt-architecture-explained",
  title: "Understanding the MG ADAPT Architecture: Multi-Powertrain EV & Hybrid Explained",
  description:
    "What a multi-powertrain architecture like JSW MG's ADAPT actually is, why one body can carry a pure EV, a plug-in hybrid and a range-extender, and what that flexibility costs the buyer.",
  category: "Platform deep-dive",
  published: "2026-08-04",
  readingMinutes: 8,
  image: "/images/vehicles/cars/T2/p1_1.png",
  imageAlt: "Front three-quarter view of a new-energy SUV",
  standfirst:
    "JSW MG has spent the last two years talking about ADAPT as the backbone of its India lineup. Strip away the launch-deck language and what you are looking at is a fairly specific engineering bet: one floorpan, three or more powertrains, and a battery pack that changes size instead of the car changing shape.",
  blocks: [
    {
      paragraphs: [
        "Almost every carmaker selling in India right now is trying to solve the same problem. Nobody knows how fast the country will switch to electric. Charging build-out is uneven, fuel prices move, state subsidies change every budget cycle, and a family in Kochi and a family in Kanpur have genuinely different needs. Committing an entire model line to pure EV is risky. Committing it to petrol is riskier over a ten-year horizon.",
        "A multi-powertrain architecture is the hedge. Rather than developing one platform for combustion cars and a separate skateboard for electric ones, you design a single structure that can take either — and you decide which version to build much later in the process, ideally after the factory is already tooled. ADAPT is JSW MG's version of that idea, and it is the reason the company can talk credibly about launching several models in a short window.",
      ],
    },
    {
      heading: "What 'multi-powertrain' actually means structurally",
      paragraphs: [
        "The hard part of mixing powertrains is not the motor. It is the middle of the car. A dedicated EV platform puts a flat battery between the axles and drops the floor, which is why EV cabins feel roomy and why their sills are deep. A combustion platform needs a transmission tunnel, an exhaust run, a fuel tank ahead of the rear axle, and a front structure sized for an engine and its cooling pack.",
        "A flexible architecture reconciles these by designing the tunnel and the underfloor as a shared cavity. On the EV version that cavity carries battery modules end to end. On the plug-in hybrid it carries a shorter pack plus the fuel tank and exhaust routing. The crash structure, the suspension hard points, the seating positions and the body-in-white stay common. That commonality is where the money is saved — a body shop, a paint line and a stamping set are far more expensive to duplicate than a powertrain line.",
        "The trade-off is that neither version is theoretically optimal. The pure EV built on a flexible platform usually gives up a little packaging efficiency to a ground-up skateboard: slightly less frunk, a slightly higher floor, occasionally a taller step-in height. In exchange, the manufacturer can build all three variants on the same line and change the mix week to week as demand moves.",
      ],
      callout:
        "Rule of thumb: a dedicated EV platform wins on packaging; a flexible platform wins on risk. In a market where EV demand is real but unpredictable, the second bet is the more defensible one.",
    },
    {
      heading: "The three powertrain flavours you should expect",
      paragraphs: [
        "Announcements around ADAPT-class architectures generally cover three configurations, and it is worth being precise about how they differ, because the marketing names blur together badly in India.",
      ],
      bullets: [
        "Battery electric (BEV) — motor or motors, a full-size pack, no engine. Simplest to service, cheapest per kilometre to run, most dependent on charging access.",
        "Plug-in hybrid (PHEV) — a meaningful battery (typically 15–30 kWh in this class) plus an engine. You can do the daily commute on electricity alone and still take a highway trip without planning charge stops.",
        "Range-extender / series hybrid (EREV) — the wheels are always driven electrically; the engine exists only to generate current for the battery. It drives like an EV, refuels like a petrol car, and is the configuration Chinese manufacturers have leaned into hardest.",
      ],
    },
    {
      paragraphs: [
        "The EREV is the one Indian buyers have the least intuition for, because we have barely had any. It matters here because it sidesteps the two objections that stop people buying EVs — range anxiety and long-drive planning — without asking the buyer to learn a new driving experience. The engine never sends torque to the wheels, so there is no gearbox hunting, no shift shock and no torque handover.",
        "What it costs you is efficiency on long highway runs. A series hybrid burning fuel to make electricity to drive a motor is doing an extra energy conversion that a good conventional hybrid avoids. On a 60 km city day the EREV wins comfortably. On a Delhi–Jaipur run at 100 km/h it will typically be thirstier than a well-sorted parallel hybrid.",
      ],
    },
    {
      heading: "Why battery chemistry choice is downstream of the platform",
      paragraphs: [
        "A flexible architecture forces a particular kind of battery design: modular, with a standard module height and mounting pattern, so that a 40 kWh pack and a 75 kWh pack can bolt into the same tray. That pushes manufacturers toward LFP (lithium iron phosphate) for the volume trims and NMC (nickel manganese cobalt) for the long-range ones.",
        "For an Indian buyer that split has real consequences. LFP is more tolerant of being charged to 100% every night, degrades more gently over many cycles, and is cheaper. It is also less energy-dense, so the long-range trim carries more mass, and it is noticeably less happy in genuine cold — which matters in Leh and Shimla far more than in Chennai.",
        "NMC gives you the headline range figure and better cold-weather behaviour, but rewards being kept between roughly 20% and 80% state of charge for daily use. If a dealer tells you the two trims of the same car behave identically, they are simplifying. Ask which chemistry is in the pack you are signing for.",
      ],
    },
    {
      heading: "What it means when you are actually shopping",
      paragraphs: [
        "Platform flexibility is an engineering virtue, not a feature you drive. When these cars reach showrooms, the questions worth asking are narrower and more practical than the platform story suggests.",
        "First: on the PHEV, what is the electric-only range on a realistic Indian duty cycle, not the certification figure? If your round trip is 45 km and the car does a genuine 55 km on battery, you will visit a fuel station a handful of times a year. If it does 35 km, you are buying a heavier petrol car with a battery you drag around.",
        "Second: what is the pack's DC charging ceiling, and can it hold it? A peak of 90 kW that tapers at 45% is worse in practice than a flat 65 kW that holds to 70%. Charging curves are rarely published in India; the honest answer usually comes from owners rather than brochures.",
        "Third: what does the warranty actually cover on the battery, and what counts as degradation? Eight years or 1.6 lakh km is becoming the norm, but the threshold below which a pack is replaced — typically 70% of original capacity — is the number that decides whether the warranty ever pays out.",
      ],
      callout:
        "Everything in this piece is drawn from public announcements, platform-level engineering norms and comparable products already on sale. Specifications for unlaunched models are not final until the manufacturer homologates them, and we update these guides when they are.",
    },
    {
      heading: "The bottom line",
      paragraphs: [
        "ADAPT-style architectures are not a technological leap so much as a commercial one. They let a manufacturer enter a volatile market with several bets placed at once and adjust the mix as buyers actually behave, rather than as a five-year forecast predicted they would.",
        "For buyers that is mostly good news: more variants, faster launches, and a real chance to pick the powertrain that fits your life rather than the one the segment happens to offer. It also means you have to do slightly more homework, because two cars with the same badge and the same body can now have almost nothing in common under the floor.",
      ],
    },
  ],
};

import type { ArticleBlock, ArticleTable } from "@/types/article";

/**
 * Written analysis attached to the model and specification routes. Kept as data
 * so the same components that render the guides render these — the spec pages
 * were previously bare trim tables with no commentary at all.
 */
export interface ModelEditorial {
  /** 300–400 word written overview, rendered above the data. */
  overview: ArticleBlock[];
  comparison: ArticleTable;
  /** One-paragraph framing for the comparison table. */
  comparisonIntro: string;
  pros: string[];
  cons: string[];
  prosConsNote: string;
}

export const t2Editorial: ModelEditorial = {
  overview: [
    {
      heading: "Written overview: what the T2 actually is",
      paragraphs: [
        "The Jetour T2 is a monocoque adventure SUV rather than a ladder-frame off-roader, and almost everything interesting about it follows from that decision. It runs Chery's Kunpeng power units — a 1.5T and a 2.0T, both driving through a 7-speed dual-clutch transmission — with an automatic X Wheel Drive system that shifts between two- and four-wheel drive on its own rather than waiting for a driver to select a transfer case. On the 2.0T there are 6+X driving modes, including Snow, Sediment and Rock settings plus an X Smart mode that reads grip and load itself.",
        "For India the more consequential version is the plug-in hybrid. In a T2-sized PHEV the architecture is a dedicated hybrid transmission pairing a turbocharged engine with an electric drive unit and a traction pack of roughly 18–20 kWh in this class. Chemistry matters here: packs of this size in adventure-oriented SUVs are typically LFP, which is the right choice for Indian conditions — more tolerant of being charged to full every night, gentler degradation over many cycles, and considerably more relaxed about sitting at 45°C in an open parking lot than an NMC pack would be. The trade is energy density, so a PHEV pack of this size buys you a commute rather than a road trip.",
        "Real-world electric-only range on Indian roads for a pack in that band works out to roughly 55–70 km in city use, and closer to 40–50 km if you spend the day on a ring road at 80 km/h with the air conditioning fighting a May afternoon. That is enough to cover the daily driving of most owners entirely on electricity while leaving the engine for weekend distance — which is the entire point of the configuration, and why it suits a country with uneven charging far better than a pure EV of the same size would.",
        "The ADAPT-style design context is worth stating plainly, because it explains the compromises. A body engineered to accept a combustion powertrain, a plug-in hybrid and a battery-electric drivetrain cannot optimise its floor for any one of them. You get a slightly higher floor than a dedicated EV skateboard would give, and a slightly heavier structure than a pure combustion SUV would need. In exchange the manufacturer can build all three on one line and shift the mix as Indian demand actually moves. On a 4,785 mm body with 220 mm of ground clearance and a 2,800 mm wheelbase, that packaging penalty is easily absorbed — which is exactly why flexible architectures show up in large SUVs first.",
      ],
    },
  ],
  comparisonIntro:
    "The T2's rivals split into two camps: large monocoque SUVs that prioritise on-road comfort, and ladder-frame vehicles that give up refinement for genuine articulation. The T2 sits deliberately in the first camp with more off-road hardware than its rivals carry.",
  comparison: {
    caption:
      "Competitive set as of August 2026. Prices are indicative ex-showroom bands and vary by trim and state.",
    head: ["", "Jetour T2", "Mahindra XUV700", "MG Gloster", "Mahindra Thar Roxx"],
    rows: [
      ["Construction", "Monocoque", "Monocoque", "Ladder frame", "Ladder frame"],
      ["Length", "4,785 mm", "4,695 mm", "4,985 mm", "4,428 mm"],
      ["Wheelbase", "2,800 mm", "2,750 mm", "2,950 mm", "2,850 mm"],
      ["Ground clearance", "220 mm", "200 mm", "210 mm", "~207 mm"],
      ["Seating", "5", "5 or 7", "6 or 7", "5"],
      ["Four-wheel drive", "Automatic XWD, 6+X modes", "AWD on top trims", "4WD with low range", "4WD with low range"],
      ["Powertrain focus", "1.5T / 2.0T petrol, PHEV expected", "Petrol and diesel", "Diesel", "Petrol and diesel"],
      ["Indicative price band", "~₹30 lakh", "₹14–26 lakh", "₹40–44 lakh", "₹13–23 lakh"],
    ],
  },
  pros: [
    "Genuine off-road hardware — 220 mm of clearance and an automatic XWD system with terrain modes — in a body that rides like a road SUV.",
    "A monocoque structure means it is far more comfortable on the 98% of driving that is tarmac than any ladder-frame rival here.",
    "The 2.0T's 6+X mode set, including Rock and Sediment, is more capability than most crossovers at this price offer.",
    "A plug-in hybrid variant on a flexible platform gives buyers without home charging a route into electrified running.",
    "Equipment levels on the higher trims — 360° camera, blind-spot detection, adaptive cruise, L2 assistance — are competitive with cars costing more.",
  ],
  cons: [
    "At an expected ~₹30 lakh it is priced against established seven-seaters that offer a third row the T2 does not have.",
    "No low-range transfer case, so it is not a substitute for a ladder-frame vehicle on slow technical terrain or repeated recovery work.",
    "Charging infrastructure compatibility on the PHEV is fine on AC but the pack is small enough that DC fast charging is largely beside the point — plan around a home or office AC point.",
    "As a new entrant, service network depth outside metros is the open question, and it is the thing that most affects resale in India.",
    "Ground clearance and dimensions are manufacturer figures; laden clearance and real wading depth should be confirmed with the dealer before you rely on them.",
  ],
  prosConsNote:
    "Pricing, variant availability and final India specification were not confirmed at the time of writing. This assessment is based on announced specifications and comparable products already on sale, and is updated as official figures are released.",
};

export const v23Editorial: ModelEditorial = {
  overview: [
    {
      heading: "Written overview: the V23 in Indian conditions",
      paragraphs: [
        "The V23 is a 100% battery-electric compact SUV with a deliberately boxy, retro-styled body — 4,220 mm long, 1,915 mm wide and 1,845 mm tall. Those proportions are the story. A tall, square body on a compact footprint means far more headroom and visibility than the length suggests, and it means the battery can sit flat under the floor without pushing the seating position uncomfortably high, which is the compromise that spoils many converted city EVs.",
        "The powertrain is quoted at 211 PS and 292 Nm with a 0–100 km/h time of 7.5 seconds, offered in both two- and four-wheel-drive configurations, with a maximum NEDC range of 430 km. NEDC is the most optimistic of the common cycles, so the honest Indian expectation is materially lower: roughly 300–340 km in mixed city use on the two-wheel-drive version, and closer to 240–270 km at a sustained 100 km/h with the air conditioning working through a north Indian summer. The four-wheel-drive version trades perhaps 8–10% of that for traction.",
        "On battery chemistry, a pack in this size and price band is very likely LFP, and for India that is the right answer. LFP tolerates being charged to 100% nightly, which suits a car whose owner charges at home and drives 40 km a day, and it degrades more gracefully across many shallow cycles than NMC does. It is also less energy-dense and less happy in genuine cold, which matters if the car will live in Shimla rather than Chennai. The practical consequence is that V23 owners should charge to full regularly — with LFP, a weekly 100% charge is what keeps the state-of-charge estimate honest, the opposite of the advice given for NMC cars.",
        "Charging infrastructure compatibility is where a car like this is easy to live with. A pack in this class takes a 7.4 kW AC wall box overnight comfortably, which is all most owners will ever need, and DC fast charging exists for the occasional long drive rather than as the primary method. Twelve ADAS functions — adaptive cruise, autonomous emergency braking, blind-spot detection and lane-keeping among them — put it level with the segment rather than ahead of it, and the boxy body's excellent outward visibility arguably does more for everyday safety in Indian traffic than any of them.",
      ],
    },
  ],
  comparisonIntro:
    "The V23 competes in India's most crowded electric segment, where every rival is a conventionally styled crossover. Its case rests on being the one that looks like nothing else, without giving up the fundamentals.",
  comparison: {
    caption:
      "Competitive set as of August 2026. Range figures are manufacturer claims on different test cycles and are not directly comparable — treat them as upper bounds.",
    head: ["", "JSW V23", "Mahindra BE 6", "MG Windsor EV", "Tata Nexon EV"],
    rows: [
      ["Body style", "Boxy retro SUV", "Coupe-style SUV", "Crossover MPV", "Compact SUV"],
      ["Length", "4,220 mm", "4,371 mm", "4,295 mm", "3,995 mm"],
      ["Height", "1,845 mm", "1,627 mm", "1,677 mm", "1,620 mm"],
      ["Peak power", "211 PS", "231 PS (79 kWh)", "136 PS", "144 PS (LR)"],
      ["0–100 km/h", "7.5 s", "6.7 s", "~10 s", "~8.9 s"],
      ["Claimed range", "430 km (NEDC)", "up to 682 km (MIDC)", "up to 449 km (MIDC)", "up to 489 km (MIDC)"],
      ["Drivetrain", "2WD and 4WD", "RWD", "FWD", "FWD"],
      ["Indicative price band", "₹18–20 lakh", "₹18.9–26.9 lakh", "₹14–18 lakh", "₹12.5–17.2 lakh"],
    ],
  },
  pros: [
    "The boxy body is a genuine functional advantage, not just styling — headroom, outward visibility and a square boot are all better than the footprint implies.",
    "211 PS and 7.5 seconds to 100 km/h make it quick for the class, and the optional four-wheel drive is rare at this price.",
    "Expected LFP chemistry suits Indian heat and daily full charging, and should hold capacity well across an eight-year ownership.",
    "A pack of this size charges fully overnight on a standard 7.4 kW home wall box, so DC fast charging is optional rather than essential.",
    "In a segment where every rival looks broadly the same, distinctive design is a real ownership pleasure and may help residuals.",
  ],
  cons: [
    "430 km is an NEDC figure; budget 300–340 km in realistic Indian mixed use and less again on the highway in summer.",
    "A tall, boxy body pays an aerodynamic penalty that shows up precisely where EVs are weakest — sustained highway speed.",
    "Price positioning around ₹18–20 lakh puts it against established rivals with deeper service networks and better-understood resale.",
    "Compact footprint means rear-seat legroom and boot volume are city-car figures, not family-tourer ones.",
    "Cold-weather range loss will be more noticeable than on an NMC-packed rival if the car lives at altitude.",
  ],
  prosConsNote:
    "Final India specification, battery chemistry, pricing and variant mix were not officially confirmed at the time of writing. Figures for rivals are manufacturer claims on differing test cycles.",
};

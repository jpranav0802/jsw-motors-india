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

/**
 * India-spec JSW Combat key figures, as reported ahead of the December 2026
 * unveil. Shown above the global T2 trim sheet, which covers petrol trims the
 * Combat is not expected to offer in India.
 */
export const combatIndiaSpec: ArticleTable = {
  caption:
    "Expected India specification, compiled from Autocar India, CarDekho, CarWale and Rushlane reports (October 2026). Unconfirmed until launch.",
  head: ["", "JSW Combat (India, expected)"],
  rows: [
    ["Global name", "Jetour T2"],
    ["Unveil", "4 December 2026 (invites issued for 3–4 December)"],
    ["Launch / prices", "December 2026 – early 2027"],
    ["Expected price", "₹30–50 lakh ex-showroom (most reports: ₹40–50 lakh)"],
    ["Powertrain", "Plug-in hybrid: 1.5-litre direct-injection turbo-petrol + two electric motors"],
    ["Combined output", "360 hp, 610 Nm"],
    ["Transmission", "3-speed dedicated hybrid transmission (DHT)"],
    ["Drive", "Front-wheel drive (global T2 also offers XWD all-wheel drive)"],
    ["Battery", "18.4 kWh"],
    ["Electric range", "90 km (NEDC, claimed)"],
    ["Total range", "Up to 1,100 km (claimed)"],
    ["Charging (global T2)", "6.6 kW AC: 30–100% in ~3 h · 50 kW DC: 30–80% in 27 min"],
    ["Length × width × height", "4,785 × 2,006 × 1,880 mm"],
    ["Wheelbase", "2,800 mm"],
    ["Ground clearance", "220 mm"],
    ["Boot space", "752 litres"],
    ["Seating", "5"],
    ["Wheels", "20-inch alloys, tailgate-mounted spare"],
    ["Screens", "15.6-inch touchscreen, 10.25-inch digital cluster"],
    ["Key features", "Panoramic sunroof, ventilated and memory front seats, 12-speaker Sony audio, 50 W wireless charging"],
    ["Safety", "6 airbags, 540° camera, Level 2 ADAS with adaptive cruise"],
    ["Colours (expected)", "Night Black, Sand, Sun Orange, Lime Green, Misty Cyan, Silver Snow"],
    ["Assembly", "JSW plant, Chhatrapati Sambhajinagar, Maharashtra (early units may be imported)"],
  ],
};

export const t2Editorial: ModelEditorial = {
  overview: [
    {
      heading: "Written overview: what the Combat actually is",
      paragraphs: [
        "The JSW Combat is the India version of the Jetour T2, the boxy adventure SUV Chery sells abroad. It is the first car JSW Motors will sell under its own badge, separate from the JSW MG Motor joint venture. It is built under a licensing and parts deal with Chery and is due to be assembled at JSW's plant in Chhatrapati Sambhajinagar. Reports say India gets the pre-facelift T2 design with small changes: reworked headlamps and bumpers, and COMBAT lettering across the bonnet where the Jetour badge used to be.",
        "The bigger change is the powertrain. Abroad the T2 is mostly a petrol car with 1.5T and 2.0T engines and XWD all-wheel drive. India is expected to get only the plug-in hybrid. A 1.5-litre direct-injection turbo-petrol works with two electric motors and an 18.4 kWh battery through a 3-speed dedicated hybrid transmission. Combined output is quoted at 360 hp and 610 Nm, sent to the front wheels. The claimed electric range is 90 km on the NEDC cycle, and total range is up to 1,100 km.",
        "Real-world electric range on Indian roads will be lower than 90 km. Expect roughly 55–70 km in city traffic, and 40–50 km on a fast ring road with the air conditioning running in May. That still covers most owners' daily driving on electricity, with the engine saved for weekends and highway trips. This is why a plug-in hybrid suits a country with uneven public charging. Charging is easy: a 6.6 kW AC point takes the pack from 30% to 100% in about three hours, and 50 kW DC does 30–80% in under half an hour.",
        "The trade-off is off-road ability. The Combat is a monocoque SUV with 220 mm of ground clearance, a 2,800 mm wheelbase and a body that is 4,785 mm long and 2,006 mm wide, so it handles bad roads and hill tracks with ease. But a front-wheel-drive plug-in hybrid is not a Fortuner substitute on slow, technical terrain. If JSW later brings the global T2's XWD all-wheel drive, that would change. Until then, the Combat is best understood as a large, well-equipped, very low-running-cost family SUV that looks like an off-roader.",
      ],
    },
  ],
  comparisonIntro:
    "The Combat's expected ₹30–50 lakh price puts it against two kinds of car: comfortable monocoque SUVs like the Kia Sorento and Skoda Kodiaq, and diesel ladder-frame SUVs like the Toyota Fortuner and MG Majestor. It is the only plug-in hybrid in the group.",
  comparison: {
    caption:
      "Competitive set as of October 2026. Combat figures are expected; confirm rival specifications and prices with dealers.",
    head: ["", "JSW Combat", "Toyota Fortuner", "Kia Sorento", "MG Majestor"],
    rows: [
      ["Construction", "Monocoque", "Ladder frame", "Monocoque", "Ladder frame"],
      ["Powertrain", "1.5T plug-in hybrid", "Diesel / petrol", "Hybrid (global)", "Diesel"],
      ["Electric-only driving", "90 km (NEDC, claimed)", "None", "Short bursts only", "None"],
      ["Seating", "5", "7", "6 or 7", "7"],
      ["Drive", "FWD (expected)", "4x2 / 4x4 with low range", "FWD / AWD", "4x2 / 4x4"],
    ],
  },
  pros: [
    "The only plug-in hybrid at this price: most weekday driving can run on electricity, at a fraction of a diesel's running cost.",
    "360 hp and 610 Nm combined is a lot of performance for a family SUV at this price.",
    "A big, boxy 4,785 mm body with 220 mm of clearance and a 752-litre boot looks and carries like a proper adventure SUV.",
    "Expected kit is generous: 15.6-inch screen, panoramic sunroof, ventilated memory seats, 12-speaker Sony audio, 540° camera and Level 2 ADAS.",
    "A monocoque body should ride far better on tarmac than the ladder-frame Fortuner and Majestor.",
  ],
  cons: [
    "Five seats only, while the Fortuner, Majestor and Sorento offer a third row at similar money.",
    "India-spec is expected to be front-wheel drive, with no low range, so it is not a true off-road rival to a 4x4 Fortuner.",
    "Plug-in hybrids do not get the road-tax waivers that many states give full EVs, so check your state's on-road price.",
    "JSW Motors is a brand-new car maker in India: service network depth and resale value are open questions.",
    "Prices, variants and the final India specification are still unconfirmed and could move at the December unveil.",
  ],
  prosConsNote:
    "Pricing, variants and the final India specification had not been announced at the time of writing (late October 2026). This assessment is based on press reports and the global T2's specification, and will be updated when JSW Motors publishes official figures.",
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
    head: ["", "iCAR V23", "Mahindra BE 6", "MG Windsor EV", "Tata Nexon EV"],
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

import type { Article } from "@/types/article";

export const evBatteryHealthIndianSummer: Article = {
  slug: "ev-battery-health-indian-summer",
  title: "Electric Car Battery Health: Best Charging Practices for Indian Summer Temperatures",
  description:
    "How 45°C ambient heat actually damages a lithium-ion pack, and the charging and parking habits that measurably slow degradation in Indian conditions.",
  category: "Ownership guide",
  published: "2026-06-09",
  updated: "2026-07-30",
  readingMinutes: 8,
  image: "/v23/adas.jpg",
  imageAlt: "Electric vehicle charging port",
  standfirst:
    "Indian EV owners inherit a battery-care playbook written for European and Chinese climates. Most of it holds. The parts that do not are the parts that matter in a Nagpur May.",
  blocks: [
    {
      paragraphs: [
        "Lithium-ion cells age two ways. Cycle ageing comes from charging and discharging — every full cycle consumes a little capacity. Calendar ageing happens whether you drive or not, and it is driven almost entirely by two variables: the temperature the cell sits at, and the state of charge it sits at.",
        "In most of the world, calendar ageing is a slow background process. In an Indian summer it is not. A pack sitting at 45°C degrades several times faster than the same pack at 25°C, and the relationship is exponential rather than linear. This is why the single highest-value habit for an Indian EV owner has nothing to do with charging at all — it is where you park.",
      ],
    },
    {
      heading: "Heat is the primary variable, not charging speed",
      paragraphs: [
        "Owners obsess about DC fast charging and ignore heat soak, which is backwards. A car parked in direct sun on an open lot in Ahmedabad in May can see cabin temperatures well past 60°C and pack temperatures in the high forties for hours. Do that daily for four months a year and the cumulative damage exceeds what most people's fast-charging habits will ever cause.",
        "Shade is worth real money. Covered parking, a tree, a basement, even the shaded side of a building for the afternoon — all of it measurably reduces the hours your pack spends at damaging temperatures. If your building offers a basement slot at a premium, the battery-life argument alone often justifies it over an eight-year ownership horizon.",
        "The second heat lever is thermal management. Cars with active liquid cooling can hold pack temperature during and after fast charging; cars with passive or air cooling cannot. If you are buying for a hot region, this is worth more than 40 km of extra rated range, and it is a question worth asking directly before purchase.",
      ],
      callout:
        "The order of impact, largest first: sustained parking heat, sustained high state of charge, deep discharges, fast-charging frequency. Most owners worry about the list in reverse.",
    },
    {
      heading: "State of charge: the 20–80 rule, and when it does not apply",
      paragraphs: [
        "For NMC chemistry — the packs used in most long-range trims — keeping the car between roughly 20% and 80% for daily use is genuinely worthwhile. Cells held at high voltage age faster, and heat multiplies that effect. Leaving an NMC car at 100% in a hot open parking lot for a weekend is the worst common habit in Indian EV ownership.",
        "LFP is different. Lithium iron phosphate is more tolerant of a full charge, and manufacturers usually recommend taking it to 100% periodically — often weekly — because the flat voltage curve makes state-of-charge estimation drift otherwise, and a full charge is what recalibrates it. If your car has LFP, following NMC advice will leave you with a battery meter that lies to you.",
        "Know which one you have. It is not always obvious from the brochure, and trims of the same model frequently differ. Ask the dealer, or check the owner's manual charging section — the recommended routine gives it away.",
      ],
      table: {
        caption: "Daily charging routine by chemistry",
        head: ["", "LFP", "NMC"],
        rows: [
          ["Daily target", "80–100%", "80%"],
          ["Full charge", "Weekly, for calibration", "Only before long drives"],
          ["Long-term parking", "~50%", "~50%"],
          ["Tolerance of heat at high SoC", "Better", "Worse"],
        ],
      },
    },
    {
      heading: "Charging habits that actually help in summer",
      bullets: [
        "Charge at night. Ambient temperature is 10–15°C lower, the pack starts cooler, and in many states the tariff is lower too.",
        "Do not plug in immediately after a hard highway run in peak heat. Give the pack twenty minutes to shed heat first, unless the car actively cools during charging.",
        "Schedule the charge to finish close to when you leave, not at midnight. That minimises the hours spent sitting at a high state of charge.",
        "Precondition the cabin while still plugged in. Cooling the car on grid power rather than battery power saves range and keeps the pack from working hard on a hot start.",
        "Use AC home charging for the routine and save DC for travel. Not because DC is catastrophic, but because there is no reason to add heat you do not need.",
      ],
    },
    {
      heading: "Fast charging in 45°C — what actually happens",
      paragraphs: [
        "Two things limit DC charging speed on a hot day, and owners routinely blame the charger for both. The first is pack temperature: above a threshold the battery management system throttles current to protect the cells, which is the car doing its job. The second is the charger itself — many roadside units derate in high ambient temperatures because their own cooling cannot keep up.",
        "The practical consequence is that a session that takes 30 minutes in February takes 45 in May, and neither the car nor the charger is faulty. Plan highway stops in summer with that margin built in.",
        "Fast charging is not something to avoid on principle. Occasional DC use — a few times a month — has a small measurable effect on pack life. Exclusive DC use as your only charging method, in a hot climate, with no active cooling, is where the damage becomes visible in a few years.",
      ],
    },
    {
      heading: "Monsoon and the other Indian variable",
      paragraphs: [
        "Charging equipment on Indian EVs is sealed to a high ingress standard and charging in the rain is safe by design. What is not safe by design is a domestic socket, an extension cord and a wall box installed without proper earthing.",
        "Get the home installation done by an authorised installer with a dedicated circuit, a residual current device and a verified earth. Voltage fluctuation is the other quiet killer — many Indian supplies swing widely, and a charger without input protection will trip repeatedly or, worse, keep working while stressing its own electronics.",
        "Also check that the charging flap and port drain. Water pooling in the port housing is a slow corrosion problem, and it is far more common in cars parked outdoors through a full monsoon than manufacturers like to admit.",
      ],
    },
    {
      heading: "What good looks like after five years",
      paragraphs: [
        "A reasonably treated pack in Indian conditions should be somewhere between 88% and 93% of original capacity at five years and 60,000–80,000 km. Below about 85% at that point suggests either sustained heat exposure, near-exclusive fast charging, or a car that spent a lot of time parked full in the sun.",
        "Warranties in this market typically run eight years or around 1.6 lakh km and pay out only below roughly 70% capacity. That threshold is low enough that ordinary degradation rarely triggers it — which is exactly why the habits in this article matter more than the warranty does.",
        "If you are buying used, ask for a state-of-health readout from the manufacturer's diagnostic tool rather than a dashboard estimate. There is no standardised Indian certificate yet, and the dashboard figure is a computed guess that flatters newer packs.",
      ],
    },
  ],
};

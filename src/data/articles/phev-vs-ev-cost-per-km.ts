import type { Article } from "@/types/article";

export const phevVsEvCostPerKm: Article = {
  slug: "phev-vs-ev-cost-per-km",
  title: "PHEV vs Pure EV in India: Which Powertrain Offers Better Cost-Per-Kilometre?",
  description:
    "A worked cost-per-kilometre comparison of plug-in hybrids and battery electric cars in India, covering tariffs, fuel, servicing, insurance, road tax and resale.",
  category: "Ownership economics",
  published: "2026-07-22",
  readingMinutes: 9,
  image: "/images/vehicles/cars/T2/hybrid-charging.jpg",
  imageAlt: "A plug-in hybrid SUV charging",
  standfirst:
    "The honest answer is that it depends on where you park at night — but that answer is useless without numbers. So here are the numbers, built from tariffs and fuel prices you can check yourself, with every assumption stated.",
  blocks: [
    {
      paragraphs: [
        "Cost-per-kilometre arguments in India usually collapse into one of two bad shapes. Either someone divides electricity units by claimed range and announces that EVs cost 90 paise a kilometre, or someone adds the entire price premium of the EV to year one and concludes it never pays back. Both skip the things that actually decide it: where you charge, how much you drive, and how long you keep the car.",
        "This piece works through a comparison between a plug-in hybrid and a battery electric car of broadly similar size and price, using figures current in mid-2026. Substitute your own tariff and your own annual mileage — the method matters more than our inputs.",
      ],
    },
    {
      heading: "The assumptions, stated up front",
      bullets: [
        "Home charging at a domestic slab of ₹8 per unit, which is a fair mid-slab rate across most metros once you are past the subsidised early slabs.",
        "Public DC fast charging at ₹20 per unit, which is broadly where the major networks sit before membership discounts.",
        "Petrol at ₹96 per litre. Diesel is excluded because almost nothing in this class offers it any more.",
        "EV consumption of 6.2 km per kWh in city use and 5.1 km per kWh on the highway — realistic, not certification figures.",
        "PHEV electric-only consumption of 6.0 km per kWh, and 16 km per litre once the battery is depleted and the engine is doing the work.",
        "Annual running of 15,000 km, split 70% city and 30% highway.",
      ],
    },
    {
      heading: "Running cost, charged at home",
      paragraphs: [
        "For the pure EV, 10,500 city kilometres at 6.2 km/kWh needs about 1,694 units; 4,500 highway kilometres at 5.1 km/kWh needs about 882 units. Charging all of it at home at ₹8 gives roughly ₹20,600 a year, or about ₹1.37 per kilometre. Add roughly 8% for charging losses — the wall meter always reads more than the pack accepts — and you land near ₹1.48 per kilometre.",
        "For the plug-in hybrid, the split depends entirely on electric-only range. Assume a genuine 55 km of usable electric range and a daily commute inside that. The city portion runs almost entirely on electricity: about 1,750 units, roughly ₹14,000 with losses. The highway portion largely does not — call it 80% engine, which is 3,600 km at 16 km/l, about 225 litres, roughly ₹21,600. Total: about ₹37,000, or ₹2.47 per kilometre.",
        "So on running cost alone, charged at home, the EV is ahead by roughly ₹1 per kilometre — about ₹15,000 a year at this mileage. That is real but it is not transformative, and it is nowhere near the tenfold advantage the internet likes to claim.",
      ],
      table: {
        caption: "Annual energy cost at 15,000 km, home charging",
        head: ["", "Battery EV", "Plug-in hybrid"],
        rows: [
          ["City energy", "₹14,600", "₹14,000"],
          ["Highway energy", "₹7,600", "₹21,600"],
          ["Approx. total", "₹22,200", "₹35,600"],
          ["Cost per km", "₹1.48", "₹2.37"],
        ],
      },
    },
    {
      heading: "What happens if you cannot charge at home",
      paragraphs: [
        "This is where the comparison inverts, and it is the single most under-discussed fact in Indian EV buying. Run the same EV entirely on ₹20-per-unit DC charging and the annual energy bill goes from about ₹22,000 to about ₹55,000 — ₹3.67 per kilometre. That is more expensive than the plug-in hybrid, more expensive than a good petrol hatchback, and it comes with the added tax of queuing.",
        "Most owners land somewhere in between: a slow charge at the office, an occasional AC unit at a mall at ₹12–14, a DC session before a long drive. But if you live in an apartment where the society has not sanctioned a charging point and there is no realistic path to getting one, the cost case for a pure EV is much weaker than the brochure suggests, and a plug-in hybrid becomes genuinely rational.",
      ],
      callout:
        "Before you compare cars, settle the charging question. A sanctioned home point turns the EV into the cheapest thing on the road. No home point turns it into an expensive one.",
    },
    {
      heading: "Servicing, insurance and road tax",
      paragraphs: [
        "Service intervals for EVs are longer and the work is thinner — no oil, no filters, no spark plugs, no timing components. Expect roughly ₹4,000–6,000 a year on average across the first five years, mostly consumables, brake fluid and cabin filters. Regenerative braking also means brake pads last dramatically longer; three-year-old EVs routinely still have original pads.",
        "A plug-in hybrid carries the full combustion service schedule plus an electrical system, so it is the most expensive of the three to maintain: budget ₹9,000–14,000 a year. The engine in a PHEV often runs cold and intermittently, which is harder on it than steady use, so do not skip oil changes just because the odometer is low.",
        "Insurance premiums on EVs have historically run a little higher because pack replacement is catastrophic in claims terms, though the gap has narrowed. Road tax is where the state you register in matters enormously — several states waive road tax on battery electric vehicles entirely, and almost none extend that waiver to plug-in hybrids. On a ₹25 lakh car that exemption alone can be worth ₹1.5–2.5 lakh at purchase, which dwarfs several years of running-cost difference.",
      ],
    },
    {
      heading: "Depreciation, the number nobody models",
      paragraphs: [
        "Cost per kilometre is mostly depreciation for anyone who does normal mileage, and this is where both powertrains are hard to predict in India. The used EV market is young; buyers are still nervous about battery health, and there is no widely trusted state-of-health certificate at resale. That fear discounts three- to five-year-old EVs more than their condition justifies.",
        "Plug-in hybrids have a different problem: a small, unfamiliar buyer pool and a service story that intimidates independent garages. Neither powertrain has the residual stability of a well-known petrol automatic yet.",
        "The practical hedge is holding period. If you keep cars for seven or more years, running-cost savings compound and residual uncertainty stops mattering much. If you change every three, the price you paid and the discount you negotiated will dominate everything else in this article.",
      ],
    },
    {
      heading: "So which one",
      paragraphs: [
        "Buy the battery EV if you can charge where you sleep, your typical day is under 150 km, and you keep cars for more than four years. In that profile it is cheaper to run, cheaper to service, frequently cheaper to register, and nicer to drive in traffic.",
        "Buy the plug-in hybrid if your charging is uncertain, you regularly do unplanned long drives, or you are the only car in the household. It costs more per kilometre than an EV charged at home, but it never leaves you rearranging a trip around a charger that turns out to be occupied or broken.",
        "What does not make sense is buying a plug-in hybrid and never plugging it in. Done that way it is simply a heavy petrol car with a worse boot, and every argument in its favour disappears.",
      ],
    },
  ],
};

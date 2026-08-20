import type { Article } from "@/types/article";

export const acVsDcChargingDelhiNcr: Article = {
  slug: "ac-vs-dc-charging-delhi-ncr",
  title: "AC Home Charging vs DC Fast Charging: Full Cost and Time Breakdown in Delhi & NCR",
  description:
    "What it costs and how long it takes to charge an electric car at home versus on a public DC charger across Delhi, Gurugram, Noida and Ghaziabad — with the installation costs nobody quotes.",
  category: "Charging",
  published: "2026-06-25",
  readingMinutes: 9,
  image: "/images/vehicles/cars/T2/hybrid-charging.jpg",
  imageAlt: "Electric vehicle plugged into a charger",
  standfirst:
    "Delhi and NCR have the densest public charging network in India and some of the most confusing electricity tariffs. Both facts change the maths, and neither is in any brochure.",
  blocks: [
    {
      paragraphs: [
        "The gap between charging at home and charging in public is the single largest running-cost variable in Indian EV ownership — larger than the difference between two cars, larger than driving style, larger than tyre choice. In NCR the gap is roughly two and a half times, and understanding why takes about ten minutes.",
        "This piece covers the tariffs, the hardware, the installation reality in apartment buildings, and the time each option actually takes on a 60 kWh pack.",
      ],
    },
    {
      heading: "The tariff picture in NCR",
      paragraphs: [
        "Delhi's distribution companies operate a slab-based domestic tariff, and separate EV-specific tariffs exist that are lower than the upper domestic slabs. Where an EV meter or an EV tariff is available, it substantially improves the economics — the whole point of the policy is to keep charging off the punitive top slab.",
        "Across the border the picture differs. Haryana and Uttar Pradesh have their own slab structures and their own EV charging tariff notifications, so Gurugram, Noida and Ghaziabad do not all land on the same number. Fixed charges based on sanctioned load also vary, and adding a 7.4 kW charger sometimes pushes a household into a higher sanctioned-load bracket, which raises the monthly fixed component whether you charge or not.",
        "Practical advice: before buying the car, call your discom and ask two specific questions. Is there a separate EV tariff or EV meter available at my address, and will installing a 7.4 kW charger require a load enhancement. The answers change the annual cost by thousands.",
      ],
      table: {
        caption: "Typical NCR charging costs, mid-2026 (verify against your own bill)",
        head: ["Method", "Approx. rate", "Cost to add 50 kWh"],
        rows: [
          ["Home, EV tariff / lower slab", "₹5.5–7 per unit", "₹275–350"],
          ["Home, upper domestic slab", "₹8–10 per unit", "₹400–500"],
          ["Public AC (malls, offices)", "₹12–15 per unit", "₹600–750"],
          ["Public DC fast", "₹18–24 per unit", "₹900–1,200"],
          ["Highway DC, premium networks", "₹22–26 per unit", "₹1,100–1,300"],
        ],
      },
    },
    {
      heading: "Time: what each option actually delivers",
      paragraphs: [
        "Take a 60 kWh pack as the reference. A 3.3 kW portable charger — the cable that comes in the boot — adds roughly 18–20 km of range per hour. Overnight, that is around 150–200 km. For a household doing 40–60 km a day, it is genuinely sufficient, and it needs no installation beyond a properly earthed 16A socket.",
        "A 7.4 kW wall box roughly doubles that: about 40–45 km of range per hour, so a 20% to 90% fill takes six to seven hours. This is the sweet spot for most Indian homes. Faster single-phase AC is rare because the car's onboard charger, not the wall box, becomes the limit.",
        "DC fast charging is a different category. A 60 kW public unit takes the same pack from 20% to 80% in roughly 40–50 minutes; a 120 kW unit can do it in under 30 if the car accepts that rate and the pack is at a good temperature. In a Delhi summer, expect the longer end of both ranges — heat throttles both the car and the charger.",
      ],
      callout:
        "The number that matters is not peak kW, it is average kW across the session. A charger that peaks at 120 kW but averages 55 gives you the same coffee break as a steady 60 kW unit.",
    },
    {
      heading: "The installation cost nobody quotes",
      paragraphs: [
        "A 7.4 kW wall box itself is typically ₹25,000–45,000 depending on brand and whether it has app control and load balancing. Manufacturers often bundle one with the car, which is worth confirming rather than assuming.",
        "Installation is where budgets break. If the parking slot is 40 metres from the meter, you are paying for 40 metres of appropriately rated cable, conduit and labour, and in an apartment basement that often means core drilling and a society NOC. Realistic all-in installation in an NCR apartment runs ₹15,000–40,000. In an independent house with the meter near the porch it can be ₹6,000.",
        "Then there is load enhancement. If your sanctioned load has no headroom for 7.4 kW, the discom application adds cost and several weeks. Many owners solve this by fitting the charger with dynamic load management, which throttles charging when household consumption is high — cheaper than enhancing the connection and, for overnight charging, functionally invisible.",
      ],
    },
    {
      heading: "Apartment charging: the actual blocker",
      paragraphs: [
        "Delhi and several NCR authorities have issued rules intended to make charging points in group housing straightforward, and model bye-laws exist for exactly this. In practice the outcome still depends on your resident welfare association, and RWA objections cluster around three things: fire risk, the fairness of using common electricity, and who pays if the wiring needs upgrading.",
        "The approach that works is boringly procedural. Apply in writing, cite the relevant state EV policy provision on charging in group housing, propose a separate sub-meter so your consumption is unambiguously yours, and bring a quotation from an authorised installer with an earth-leakage device specified. Framing it as a metered, professionally installed, individually billed connection removes most of the objections before they are raised.",
        "If the RWA still refuses, your fallback is a workplace charger or a nearby AC point — but be honest that this changes your cost per kilometre materially, and factor it in before you sign for the car.",
      ],
    },
    {
      heading: "A sensible NCR charging routine",
      bullets: [
        "Home AC overnight for 90% of your energy. It is the cheapest electricity you will ever put in the car and the gentlest on the pack.",
        "Public AC at the office or a mall as opportunistic top-up — slower, mid-priced, and it keeps you off DC.",
        "DC fast charging reserved for departures and long drives. Budget one session for a Delhi–Jaipur round trip, two for Delhi–Dehradun in summer with the air conditioning working.",
        "Check charger status in the network app before you commit to a stop. NCR has good density but real-world uptime varies enormously by operator.",
        "In peak summer, add fifteen minutes to every planned DC stop. The derating is predictable and planning around it is less annoying than discovering it.",
      ],
    },
    {
      heading: "The bottom line for NCR",
      paragraphs: [
        "With a home charger and a favourable tariff, an EV in Delhi NCR runs at roughly ₹1.20–1.50 per kilometre. Without one, relying on public DC, the same car runs at ₹3.50–4.00 — comparable to a petrol car and considerably less convenient.",
        "The infrastructure here is good enough that public-only ownership is possible in a way it is not in most of India. It is just not cheap. Sort out the home connection first; every other charging decision is small by comparison.",
      ],
    },
  ],
};

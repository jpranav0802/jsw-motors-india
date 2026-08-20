import type { Article } from "@/types/article";

export const highwayChargingNetworksIndia: Article = {
  slug: "highway-charging-networks-india",
  title: "A Guide to Public EV Charging Networks Across Indian National Highways",
  description:
    "Who operates the DC fast chargers on India's highways, which corridors are genuinely covered, and how to plan a long electric drive without gambling on a single charger.",
  category: "Charging",
  published: "2026-08-01",
  readingMinutes: 9,
  image: "/jaecoo-j5/adventure.webp",
  imageAlt: "SUV on an open highway",
  standfirst:
    "India's highway charging network is no longer thin — it is uneven. Knowing which corridors are solved and which still need planning is the difference between an easy drive and a bad afternoon.",
  blocks: [
    {
      paragraphs: [
        "Five years ago, driving an electric car from Delhi to Mumbai was a stunt. Today it is ordinary on the main corridors and still requires thought on the secondary ones. The change has come from a mix of oil marketing companies fitting chargers at existing fuel stations, dedicated charge point operators building out along expressways, and carmakers underwriting networks to make their own products viable.",
        "What has not changed is the reliability gap. Charger density on paper overstates charger availability in practice, and the operators differ enormously on uptime, payment reliability and how honestly their app reports a broken unit.",
      ],
    },
    {
      heading: "Who actually operates the chargers",
      bullets: [
        "Oil marketing companies — Indian Oil, Bharat Petroleum and Hindustan Petroleum have installed chargers at fuel stations along major highways. The advantage is enormous: a forecourt has lighting, security, a toilet, food and staff. The disadvantage is that power ratings vary widely and maintenance depends on the dealer.",
        "Dedicated charge point operators — Statiq, ChargeZone, Jio-bp pulse, Tata Power EZ Charge and Ather Grid among others. These run app-first networks with reservation and live status, and generally have the highest-rated DC units.",
        "Carmaker networks — Tata Power's tie-up with Tata Motors and MG's charging partnerships fall here. Access is usually open to all vehicles but pricing or reliability may favour the sponsoring brand's owners.",
        "Hospitality and retail — hotels, resorts and highway restaurants increasingly fit AC chargers. Slow, but the right speed for an overnight halt, and often free or nominally priced for guests.",
      ],
    },
    {
      heading: "Corridors that are genuinely solved",
      paragraphs: [
        "The Delhi–Jaipur stretch of NH-48 is the best-served road in the country, with multiple DC options at reasonable intervals and enough redundancy that a broken unit is an inconvenience rather than a problem. Delhi–Agra on the Yamuna Expressway is similar, as is Mumbai–Pune.",
        "The Mumbai–Nagpur Samruddhi Expressway, Bengaluru–Chennai, Bengaluru–Mysuru, Ahmedabad–Vadodara–Surat and the Delhi–Chandigarh corridor all now support electric travel without unusual planning. Broadly, if a route connects two large metros and carries heavy expressway traffic, assume it is covered.",
        "The Golden Quadrilateral as a whole is drivable in an electric car with a real 350 km-plus range. It is the spurs and the diagonals where planning starts to matter.",
      ],
      callout:
        "Coverage descriptions here reflect the situation in August 2026 and change quickly — usually for the better. Always confirm against a live network map before departure rather than trusting any article, including this one.",
    },
    {
      heading: "Corridors that still need planning",
      paragraphs: [
        "Hill routes are the hardest. Chargers in Himachal, Uttarakhand and the North East are sparse, often single units with no backup, and frequently on constrained power supplies that deliver well below their rated output. The good news is that mountain driving recovers a lot of energy on descents; the bad news is the climb up consumes it faster than any highway figure suggests.",
        "Central India away from the main expressways — much of Madhya Pradesh, Chhattisgarh, interior Odisha and Jharkhand — has real gaps of 150 km or more between reliable DC units. Rajasthan away from the Delhi–Jaipur–Udaipur axis is similar.",
        "Coastal Karnataka, interior Andhra Pradesh and the Konkan route have improved substantially but still reward carrying a portable AC charger and knowing which hotels along the way will let you plug in overnight.",
      ],
      table: {
        caption: "Planning posture by route type",
        head: ["Route type", "Planning needed", "Buffer to keep"],
        rows: [
          ["Metro-to-metro expressway", "Minimal — pick a stop en route", "15% arrival charge"],
          ["National highway, non-expressway", "Identify two options per stop", "20% arrival charge"],
          ["Hill route", "Plan every charge, call ahead", "30% arrival charge"],
          ["Interior state highway", "Plan around AC overnight halts", "30%+ and a portable cable"],
        ],
      },
    },
    {
      heading: "How to plan a long drive properly",
      bullets: [
        "Use at least two apps. No single operator's map is complete, and community apps like PlugShare carry the recent-usage comments that tell you whether a unit actually works.",
        "Always identify a backup charger within 30 km of every planned stop. A single-charger plan is not a plan.",
        "Register and add payment to every relevant network before you leave. Doing it on a patchy 4G signal at a forecourt at 11pm is how good trips go wrong.",
        "Aim to arrive at a stop between 15% and 25%. Charging from very low is slower per minute than people expect on some packs, and arriving at 5% removes every option if the unit is dead.",
        "Charge 20% to 80%, not to 100%. The last fifth takes as long as the first three, and on the road that is time you do not need to spend.",
        "In summer, add fifteen minutes per stop for thermal derating on both the car and the charger.",
        "Carry the portable AC cable. It will not rescue a long leg, but it turns any hotel with a 16A socket into an overnight charge.",
      ],
    },
    {
      heading: "What to expect on cost",
      paragraphs: [
        "Highway DC charging generally runs between ₹18 and ₹26 per unit depending on operator and rating, before any subscription discount. On a 60 kWh pack, a 20-to-80 session is roughly 36 units — call it ₹700–950 per stop.",
        "For a 700 km drive that is typically two stops, so roughly ₹1,500–1,900 in charging plus whatever you put in at home before leaving. Against a petrol SUV doing 13 km/l at ₹96 a litre, the same drive is around ₹5,200. The saving on long drives is real, just smaller proportionally than city running, because you are paying commercial rates rather than domestic ones.",
      ],
    },
    {
      heading: "The realistic verdict",
      paragraphs: [
        "If your long drives are metro-to-metro on expressways, an EV with 400 km of real range needs no more planning than a petrol car with a small tank. If your long drives regularly go into the hills or through interior districts, a plug-in hybrid or range-extender still removes a category of problem that no amount of planning eliminates.",
        "The network is improving faster than most people's mental model of it. Check the map again before you conclude a route is impossible — a corridor that needed careful planning eighteen months ago may not need any today.",
      ],
    },
  ],
};

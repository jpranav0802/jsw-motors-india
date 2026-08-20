import type { Article } from "@/types/article";

export const regenerativeBrakingCityRange: Article = {
  slug: "regenerative-braking-city-range",
  title: "How Regenerative Braking Systems Impact Real-World City Driving Range",
  description:
    "How much range regenerative braking actually recovers in Indian city traffic, why the gains are smaller than owners assume on the highway, and how to drive to get the most from it.",
  category: "Technology",
  published: "2026-07-02",
  readingMinutes: 8,
  image: "/v23/interior-1.jpg",
  imageAlt: "Electric car interior showing the driver display",
  standfirst:
    "Regeneration is the reason an electric car does better in traffic than on the open road — the exact inverse of every petrol car you have owned. Understanding why changes how you drive one.",
  blocks: [
    {
      paragraphs: [
        "In a combustion car, every time you brake you convert motion into heat in the brake discs and throw it away. In stop-start traffic you do that hundreds of times an hour, which is why city fuel economy is always worse than highway economy.",
        "An electric motor can run backwards as a generator. Lift off, and instead of dumping that energy as heat, the motor resists the wheels and pushes current back into the battery. The car slows down and the pack gains charge. That single mechanism is why an EV's city range figure is usually higher than its highway figure, and why Indian traffic — genuinely awful for a petrol car — suits electric cars unusually well.",
      ],
    },
    {
      heading: "How much energy actually comes back",
      paragraphs: [
        "Recovery is not free. Energy passes through the motor, the inverter and into the pack, and each conversion loses something. Round-trip efficiency for regeneration in a modern EV sits roughly between 60% and 70% — so of the kinetic energy you would otherwise waste, you get about two-thirds of it back into the battery.",
        "In dense city driving, where braking events are frequent and speeds are low, regeneration typically returns the equivalent of 15–25% of total consumption. That is a large number. It is the difference between 5.2 km per kWh and 6.4 km per kWh over the same route.",
        "On a steady highway run, it returns almost nothing, because you barely brake. This is why highway range is lower despite the drivetrain being more efficient at constant speed — aerodynamic drag rises with the square of velocity and there is no recovery to offset it.",
      ],
      table: {
        caption: "Indicative regeneration contribution by driving type",
        head: ["Driving pattern", "Regeneration share of energy used", "Effect on range"],
        rows: [
          ["Dense city, 0–40 km/h", "18–25%", "Large gain"],
          ["Mixed urban, 0–60 km/h", "12–18%", "Meaningful gain"],
          ["Suburban arterial, 60–80 km/h", "5–10%", "Modest gain"],
          ["Highway, steady 100 km/h", "1–3%", "Negligible"],
          ["Long downhill descent", "Can exceed 100% of that segment", "Range increases"],
        ],
      },
    },
    {
      heading: "Why hill descents are the spectacular case",
      paragraphs: [
        "Drive down from Shimla or a Western Ghats pass in an electric car and the range estimate will climb rather than fall. On a sustained descent, gravity does the work and the motor spends the entire time generating. It is not unusual to arrive at the bottom with more charge than you started with.",
        "This has a genuine safety benefit that combustion drivers will recognise as engine braking, only much stronger. You are not riding the brakes for twenty minutes, so there is no brake fade and no smell of hot pads at the bottom.",
        "There is one limit worth knowing: if the battery is already near 100%, there is nowhere for the energy to go, and the car will reduce or disable regeneration. On a car that has been charged to full at the top of a hill, expect the pedal to feel different and the friction brakes to do more work. Charging to around 80% before a long descent is the sensible habit.",
      ],
      callout:
        "Cold packs also limit regeneration. On a winter morning in north India, expect noticeably weaker lift-off braking for the first ten minutes until the battery warms — plan the first few stops accordingly.",
    },
    {
      heading: "One-pedal driving, and whether it is worth using",
      paragraphs: [
        "Most EVs offer selectable regeneration strength, and the strongest setting brings the car to a complete stop without touching the brake pedal. This is one-pedal driving, and in Indian city traffic it is genuinely restful once the muscle memory forms — you modulate a single pedal in a stop-start crawl rather than swapping feet a hundred times an hour.",
        "The efficiency difference between strong regeneration and a light coasting setting is smaller than people expect, because coasting is itself efficient — a car rolling freely is not wasting energy either. In practice the biggest gains come from anticipation, not from setting selection: lifting off early and letting regeneration do the whole deceleration recovers far more than braking late with strong regeneration enabled.",
        "The setting that is genuinely inefficient is heavy use of the friction brakes at the last moment, which is what happens when you drive an EV exactly as you drove a petrol automatic.",
      ],
    },
    {
      heading: "Blended braking, and why some cars feel odd",
      paragraphs: [
        "Pressing the brake pedal in most EVs does not immediately engage the pads. The car first increases regeneration and only calls on the friction brakes when more deceleration is demanded than the motor can supply, or when the pack cannot accept more current. Managing that handover smoothly is one of the harder pieces of chassis software in a modern car.",
        "Done well it is invisible. Done poorly you feel a small step in deceleration as the pads take over, most noticeably at very low speed just before a stop. It is worth deliberately testing on a test drive: brake gently from 40 km/h to a complete standstill and feel whether the deceleration stays linear.",
        "The mechanical upside of all this is substantial. Brake pads on well-driven EVs routinely last three to four times as long as on an equivalent petrol car. The corresponding downside, particularly in coastal and monsoon conditions, is that lightly used discs corrode. Deliberately using the friction brakes firmly once or twice a week keeps the surfaces clean, and some cars do this automatically.",
      ],
    },
    {
      heading: "Driving for maximum recovery",
      bullets: [
        "Look further ahead than you would in a petrol car. Every metre of early lift-off is energy recovered rather than wasted.",
        "Treat the accelerator as the primary brake and the brake pedal as the emergency one.",
        "Avoid charging to 100% before a descent — leave the pack room to absorb what the hill will give you.",
        "In winter, allow the pack to warm before expecting full regeneration, and precondition on grid power where the car supports it.",
        "Do not chase efficiency by driving unusually slowly in traffic. Impeding flow costs other people more energy than you save.",
      ],
    },
    {
      heading: "What this means for range claims",
      paragraphs: [
        "Certification cycles include braking events, so quoted range figures already assume regeneration. Where they mislead is in the split: an EV rated at 450 km may do 480 in genuine city use and 340 at a sustained 100 km/h. If your driving is mostly highway, discount the headline number by roughly 20–25%; if it is mostly city, you may beat it.",
        "That inversion is the single most important thing for a first-time EV buyer in India to internalise. The car is at its best exactly where your old one was at its worst.",
      ],
    },
  ],
};

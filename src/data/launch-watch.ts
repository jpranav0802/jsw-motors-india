import type { ModelTag } from "@/lib/news";

/**
 * India launch status of the three tracked cars, as reported by the Indian
 * motoring press. Edit by hand when the picture changes; the story counts next
 * to each card come from the live feed, so those update themselves.
 *
 * Last reviewed: 25 October 2026.
 */
export interface LaunchWatchEntry {
  tag: Exclude<ModelTag, "jsw">;
  name: string;
  globalName: string;
  href: string;
  image: string;
  status: string;
  /** Lime pill for confirmed or imminent dates; grey for estimates. */
  imminent: boolean;
  timing: string;
  price: string;
  summary: string;
}

export const launchWatch: LaunchWatchEntry[] = [
  {
    tag: "combat",
    name: "JSW Combat",
    globalName: "Jetour T2",
    href: "/",
    image: "/exterior/T2/sun_orange/23.png",
    status: "Unveil 4 Dec 2026",
    imminent: true,
    timing: "Prices and bookings expected December 2026 – early 2027",
    price: "₹30–50 lakh (expected)",
    summary:
      "Plug-in hybrid adventure SUV: 1.5T plus twin motors, 360 hp, 18.4 kWh battery, 90 km electric range. JSW Motors' first own-brand car.",
  },
  {
    tag: "j5",
    name: "Jaecoo J5",
    globalName: "Jaecoo J5 EV",
    href: "/jaecoo-j5",
    image: "/jaecoo-j5/exterior.webp",
    status: "Testing in India",
    imminent: false,
    timing: "Expected 2027; estimates range from late 2026 to 2028",
    price: "₹18–25 lakh (expected)",
    summary:
      "Electric premium SUV seen testing alongside the V23. Global car uses a ~59 kWh pack with about 400 km claimed range.",
  },
  {
    tag: "v23",
    name: "iCAR V23",
    globalName: "Chery iCAR V23",
    href: "/v23",
    image: "/v23/side-profile.png",
    status: "Design patented",
    imminent: false,
    timing: "Expected 2027; spotted charging in India in September 2026",
    price: "₹17–25 lakh (expected)",
    summary:
      "Boxy retro electric SUV with 2WD and AWD versions abroad. An India design patent was filed in September 2026.",
  },
];

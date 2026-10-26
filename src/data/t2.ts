import type { VehicleSection } from "@/types/vehicle";

/**
 * The JSW Combat page content. The Combat is the India name for the Jetour T2
 * (the global name), sold here as a plug-in hybrid.
 *
 * Figures come from Indian motoring press as of late October 2026 (Autocar
 * India, CarDekho, CarWale, Rushlane, Team-BHP). Nothing is official until the
 * December 2026 unveil, so the copy says "expected" or "claimed" where it should.
 * Where a claim only holds for the global T2 (XWD, terrain-mode films), the
 * caption says so.
 *
 * Asset paths still use the `T2` folders: the photos and films are of the same car.
 */

/** Unveil day, 4 December 2026 (start of the day, IST). Drives the countdown. */
export const COMBAT_UNVEIL_ISO = "2026-12-04T00:00:00+05:30";

export const t2Sections: VehicleSection[] = [
  {
    id: "firstScreen",
    data: {
      id: "T2",
      name: "Plug-in Hybrid Adventure SUV",
      badge: "Unveil · 4 December 2026",
      globalName: "Known globally as the Jetour T2",
      data: [
        { value: "1.5T PHEV", label: "Powertrain" },
        { value: "360 hp", label: "System output" },
        { value: "90 km", label: "Electric range (NEDC)" },
        { value: "₹30–50L", label: "Expected price" },
      ],
    },
  },
  {
    id: "launchBrief",
    data: {
      eyebrow: "Launch tracker",
      title: "Combat lands this December",
      body: "JSW Motors has sent out invites for 3–4 December 2026, and the Combat is expected to be unveiled on 4 December. Sales are expected to begin in December, or early 2027 at the latest. It is JSW's first car under its own badge, built in partnership with Chery and assembled at the company's plant in Chhatrapati Sambhajinagar, Maharashtra.",
      countdownTo: COMBAT_UNVEIL_ISO,
      timeline: [
        { date: "Mar 2026", title: "Dealer hunt begins", note: "JSW Motors opens dealer applications across India." },
        { date: "Sep 2026", title: "Name: Combat", note: "Reports confirm the Jetour T2 will be sold in India as the Combat." },
        { date: "Oct 2026", title: "December date set", note: "The Diwali launch slot is dropped and invites go out for 3–4 December." },
        { date: "4 Dec 2026", title: "Unveil", note: "JSW Motors launches as a brand, with the Combat as its first car.", highlight: true },
        { date: "Dec 2026 – Jan 2027", title: "Prices & bookings", note: "Prices and bookings expected soon after the unveil." },
      ],
      facts: [
        { value: "360 hp", label: "Combined output" },
        { value: "610 Nm", label: "Combined torque" },
        { value: "18.4 kWh", label: "Battery" },
        { value: "1,100 km", label: "Total range (claimed)" },
        { value: "220 mm", label: "Ground clearance" },
        { value: "752 L", label: "Boot space" },
      ],
      rivals: ["Toyota Fortuner", "Kia Sorento", "MG Majestor", "Skoda Kodiaq"],
      sources: [
        { label: "Autocar India", href: "https://www.autocarindia.com/car-news/jsw-combat-to-debut-on-december-3-440985" },
        { label: "CarDekho", href: "https://www.cardekho.com/news/general/jsw-motors-to-debut-on-december-3-jetour-t2-based-suv-likely-to-be-the-first-product-36782.htm" },
        { label: "CarWale", href: "https://www.carwale.com/news/jsw-motors-first-car-to-debut-on-4-december/" },
        { label: "Rushlane", href: "https://www.rushlane.com/amp/jsw-motors-first-car-launch-on-4th-dec-combat-suv-12558012.html" },
        { label: "Team-BHP", href: "https://www.team-bhp.com/news/jsw-unveil-combat-suv-december-4" },
      ],
    },
  },
  {
    id: "3dHall",
    data: {
      id: "T2",
      num: 36,
      endFrame: 23,
      interiorList: [
        {
          color: "linear-gradient(270deg, #FD0100 50.95%, #101112 50.96%)",
          label: "Black and Red",
          value: "T2_black_red",
        },
        { color: "#D6A559", label: "Brown", value: "T2_brown" },
      ],
      exteriorList: [
        {
          color: "linear-gradient(180deg, #7F7D7D 0%, #000 100%)",
          label: "Night Black",
          value: "night_black",
        },
        {
          color: "linear-gradient(180deg, #CBC8BA 0%, #9F9B93 100%)",
          label: "Sand",
          value: "sand",
        },
        {
          color: "linear-gradient(180deg, #B23C30 0%, #8F1004 100%)",
          label: "Sun Orange",
          value: "sun_orange",
        },
        {
          color: "linear-gradient(180deg, #D7E803 0%, #ADBB03 100%)",
          label: "Lime Green",
          value: "lime_green",
        },
        {
          color: "linear-gradient(180deg, #5A87A6 0%, #2A4B6B 100%)",
          label: "Misty Cyan",
          value: "misty_cyan",
        },
        {
          color: "linear-gradient(180deg, #CFD5DC 0%, #959FAA 100%)",
          label: "Silver Snow",
          value: "silver_snow",
        },
      ],
    },
  },
  {
    id: "plugInHybrid",
    data: {
      eyebrow: "Plug-in Hybrid",
      title: "Combat Super Hybrid",
      body: "Every Combat sold in India is a plug-in hybrid. A 1.5-litre direct-injection turbo-petrol engine works with two electric motors and an 18.4 kWh battery through a 3-speed dedicated hybrid transmission. Charge it overnight and most weekday driving can run on electricity alone. On long highway trips the engine takes over, for a claimed total range of up to 1,100 km.",
      stats: [
        { value: "90 km", label: "Electric range (NEDC, claimed)" },
        { value: "1,100 km", label: "Total range (claimed)" },
        { value: "27 min", label: "DC fast charge 30–80% (50 kW)" },
        { value: "~3 h", label: "AC charge 30–100% (6.6 kW)" },
      ],
      image: "/images/vehicles/cars/T2/hybrid-charging.jpg",
    },
  },
  {
    id: "carSwiper",
    data: {
      title: "Boxy, Unapologetic Design",
      data: [
        {
          id: "1",
          title: "Upright boxy body with COMBAT lettering on the bonnet",
          image: "/images/vehicles/cars/T2/p1_1.png",
        },
        {
          id: "2",
          title: "Square LED headlamps, 20-inch alloys and a tailgate-mounted spare",
          image: "/images/vehicles/cars/T2/p1_2.png",
        },
        {
          id: "3",
          title: "4,785 × 2,006 × 1,880 mm body, 2,800 mm wheelbase and a 752-litre boot",
          image: "/images/vehicles/cars/T2/p1_3.png",
        },
      ],
    },
  },
  {
    id: "introduction1",
    data: {
      title: "Built for Bad Roads",
      data: [
        { title: "Multiple drive modes for wet, loose and broken surfaces", image: "/images/vehicles/cars/T2/p2_1.png" },
        { title: "Hill-start assist and hill-descent control", image: "/images/vehicles/cars/T2/p2_2.png" },
        { title: "220 mm ground clearance on a 2,800 mm wheelbase", image: "/images/vehicles/cars/T2/p2_3.png" },
        {
          title: "India-spec Combat is expected to be front-wheel drive. XWD all-wheel drive is offered on the global T2",
          image: "/images/vehicles/cars/T2/p2_4.png",
        },
      ],
    },
  },
  {
    id: "introduction",
    data: {
      title: "Enjoyable Experience",
      data: [
        {
          title: "Ventilated, memory-function front seats and a 12-speaker Sony system",
          image: "/images/vehicles/cars/T2/p3_1.png",
        },
        {
          title: "1.5T turbo plus twin motors: 360 hp and 610 Nm combined",
          image: "/images/vehicles/cars/T2/p3_2.png",
        },
        { title: "Steel cage body structure with six airbags", image: "/images/vehicles/cars/T2/p3_3.png" },
        { title: "Panoramic sunroof and roof rails", image: "/images/vehicles/cars/T2/p3_4.png" },
      ],
    },
  },
  {
    id: "introduction1",
    data: {
      title: "Daily Trip",
      data: [
        { title: "Snapdragon 8155 smart cockpit chip", image: "/images/vehicles/cars/T2/p4_1.png" },
        { title: "15.6-inch touchscreen with a 10.25-inch digital cluster", image: "/images/vehicles/cars/T2/p4_2.png" },
        { title: "Level 2 ADAS, adaptive cruise and a 540° camera", image: "/images/vehicles/cars/T2/p4_3.png" },
        { title: "Ambient lighting and 50 W wireless charging", image: "/images/vehicles/cars/T2/p4_4.png" },
      ],
    },
  },
  {
    id: "videoSwiper",
    data: [
      { image: "/images/vehicles/cars/T2/video/v000.png", video: "/images/vehicles/cars/T2/video/v000.mp4", title: "Combat (Jetour T2), Adventure Now" },
      { image: "/images/vehicles/cars/T2/video/v001.png", video: "/images/vehicles/cars/T2/video/v001.mp4", title: "Adventure in the wilderness" },
      { image: "/images/vehicles/cars/T2/video/v002.png", video: "/images/vehicles/cars/T2/video/v002.mp4", title: "Driving in the Gobi Desert" },
      { image: "/images/vehicles/cars/T2/video/v003.png", video: "/images/vehicles/cars/T2/video/v003.mp4", title: "Advanced Driving Assistance System" },
      { image: "/images/vehicles/cars/T2/video/v004.png", video: "/images/vehicles/cars/T2/video/v004.mp4", title: "Intelligent Limited-slip Differential Lock · global T2" },
      { image: "/images/vehicles/cars/T2/video/v005.png", video: "/images/vehicles/cars/T2/video/v005.mp4", title: "Automatic Intelligent Four-wheel Drive · global T2" },
      { image: "/images/vehicles/cars/T2/video/v006.png", video: "/images/vehicles/cars/T2/video/v006.mp4", title: "L2 Intelligent Driving Assistance" },
      { image: "/images/vehicles/cars/T2/video/v007.png", video: "/images/vehicles/cars/T2/video/v007.mp4", title: "Slippery Road Start & High-speed Curves Driving" },
      { image: "/images/vehicles/cars/T2/video/v008.png", video: "/images/vehicles/cars/T2/video/v008.mp4", title: "Special Road Conditions Driving" },
      { image: "/images/vehicles/cars/T2/video/v009.png", video: "/images/vehicles/cars/T2/video/v009.mp4", title: "What is XWD Four-wheel Drive · global T2" },
      { image: "/images/vehicles/cars/T2/video/v010.png", video: "/images/vehicles/cars/T2/video/v010.mp4", title: "X Off-road Mode · global T2" },
    ],
  },
  {
    id: "introduction2",
    data: [
      { image: "/images/vehicles/cars/T2/p5_1.png" },
      { image: "/images/vehicles/cars/T2/p5_2.png" },
      { image: "/images/vehicles/cars/T2/p5_3.png" },
    ],
  },
];

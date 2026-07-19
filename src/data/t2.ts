import type { VehicleSection } from "@/types/vehicle";

/**
 * The JETOUR T2 page content, transcribed verbatim from the target site's
 * runtime config and its English i18n catalogue
 * (`/_i18n/6AL6f1RP/en/messages.json`). Copy is reproduced exactly, including
 * the site's own typo in "Advanture Now".
 *
 * Asset paths are rewritten from the target's `/new-static/...` origin to our
 * local `/public` mirror; the directory structure is otherwise preserved.
 */
export const t2Sections: VehicleSection[] = [
  {
    id: "firstScreen",
    data: {
      id: "T2",
      name: "Rugged Adventure SUV",
      data: [
        { value: "1.5/2.0T", label: "Engine" },
        { value: 2800, label: "Wheelbase(mm)" },
        { value: "4785*2006*1880", label: "Length*Width*Height (mm)" },
        { value: "₹25–35L", label: "Expected Price" },
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
    id: "carSwiper",
    data: {
      title: "Attractive Styling",
      data: [
        { id: "1", title: "Hardcore style body", image: "/images/vehicles/cars/T2/p1_1.png" },
        { id: "2", title: "Hardcore matrix layout", image: "/images/vehicles/cars/T2/p1_2.png" },
        {
          id: "3",
          title:
            "4785x2006x1880 (mm) super large space (including small school bag), 2800mm super long wheelbase",
          image: "/images/vehicles/cars/T2/p1_3.png",
        },
      ],
    },
  },
  {
    id: "introduction1",
    data: {
      title: "Off-road Performance",
      data: [
        { title: "Intelligent switching of 6+X driving modes", image: "/images/vehicles/cars/T2/p2_1.png" },
        { title: "Intelligent creeping mode", image: "/images/vehicles/cars/T2/p2_2.png" },
        { title: "High passability in all road conditions", image: "/images/vehicles/cars/T2/p2_3.png" },
        {
          title: "XWD (X Wheel Drive):Fully automatic intelligently switching between 2WD and 4WD",
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
          title: "Quality: comprehensive equipments meet all your imaginations",
          image: "/images/vehicles/cars/T2/p3_1.png",
        },
        {
          title: "Power: Kunpeng power, both explosiveness and endurance",
          image: "/images/vehicles/cars/T2/p3_2.png",
        },
        { title: "Steel cage body structure", image: "/images/vehicles/cars/T2/p3_3.png" },
        { title: "Arrayed high-density roof", image: "/images/vehicles/cars/T2/p3_4.png" },
      ],
    },
  },
  {
    id: "introduction1",
    data: {
      title: "Daily Trip",
      data: [
        { title: "Snapdragon 8155 Smart Chip", image: "/images/vehicles/cars/T2/p4_1.png" },
        { title: "15.6-inch central control screen", image: "/images/vehicles/cars/T2/p4_2.png" },
        { title: "L2 Intelligent driving assistance", image: "/images/vehicles/cars/T2/p4_3.png" },
        { title: "Colorful atmosphere lights", image: "/images/vehicles/cars/T2/p4_4.png" },
      ],
    },
  },
  {
    id: "videoSwiper",
    data: [
      { image: "/images/vehicles/cars/T2/video/v000.png", video: "/images/vehicles/cars/T2/video/v000.mp4", title: "Jetour T2, Adventure Now" },
      { image: "/images/vehicles/cars/T2/video/v001.png", video: "/images/vehicles/cars/T2/video/v001.mp4", title: "Adventure in the wilderness" },
      { image: "/images/vehicles/cars/T2/video/v002.png", video: "/images/vehicles/cars/T2/video/v002.mp4", title: "Driving in the Gobi Desert" },
      { image: "/images/vehicles/cars/T2/video/v003.png", video: "/images/vehicles/cars/T2/video/v003.mp4", title: "Advanced Driving Assistance System" },
      { image: "/images/vehicles/cars/T2/video/v004.png", video: "/images/vehicles/cars/T2/video/v004.mp4", title: "Intelligent Limited-slip Differential Lock" },
      { image: "/images/vehicles/cars/T2/video/v005.png", video: "/images/vehicles/cars/T2/video/v005.mp4", title: "Automatic Intelligent Four-wheel Drive" },
      { image: "/images/vehicles/cars/T2/video/v006.png", video: "/images/vehicles/cars/T2/video/v006.mp4", title: "L2 Intelligent Driving Assistance" },
      { image: "/images/vehicles/cars/T2/video/v007.png", video: "/images/vehicles/cars/T2/video/v007.mp4", title: "Slippery Road Start & High-speed Curves Driving" },
      { image: "/images/vehicles/cars/T2/video/v008.png", video: "/images/vehicles/cars/T2/video/v008.mp4", title: "Special Road Conditions Driving" },
      { image: "/images/vehicles/cars/T2/video/v009.png", video: "/images/vehicles/cars/T2/video/v009.mp4", title: "What is XWD Fully automatic Intelligent Four-wheel Drive" },
      { image: "/images/vehicles/cars/T2/video/v010.png", video: "/images/vehicles/cars/T2/video/v010.mp4", title: "X Off-road Mode" },
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

import { VehicleTemplate } from "@/components/vehicles/VehicleTemplate";
import { t2Sections } from "@/data/t2";

export default function Home() {
  return <VehicleTemplate sections={t2Sections} />;
}

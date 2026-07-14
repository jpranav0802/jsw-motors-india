import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { VehicleTemplate } from "@/components/vehicles/VehicleTemplate";
import { t2Sections } from "@/data/t2";

export default function Home() {
  return (
    <div className="h-full relative">
      <SiteHeader />
      <VehicleTemplate sections={t2Sections} />
      <SiteFooter />
    </div>
  );
}

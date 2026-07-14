import { cn } from "@/lib/utils";
import type { VehicleSection } from "@/types/vehicle";

type Introduction2Data = Extract<
  VehicleSection,
  { id: "introduction2" }
>["data"];

interface Introduction2Props {
  data: Introduction2Data;
}

export function Introduction2({ data }: Introduction2Props) {
  return (
    <div className="group relative w-full h-svh text-white">
      <div className="relative size-full grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2">
        {data.map((item, index) => (
          <div
            key={item.image}
            className={cn(
              "w-full overflow-hidden",
              // Three images fill four row-units: the first spans two, forming a
              // full-height left column against the stacked right column.
              index === 0 && "row-span-2",
            )}
          >
            <div className="relative w-full h-full object-cover hover:scale-110 transition-all duration-1500">
              {/* Raw <img>: next/image's generated sizing would fight the rem-scaled canvas. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={item.image}
                alt=""
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import type { TitledGalleryData } from "@/types/vehicle";

interface Introduction1Props {
  data: TitledGalleryData;
}

/**
 * Slides 3 (Off-road Performance) and 5 (Daily Trip). The target reuses config
 * id `introduction1` for both; only the title and the image set differ.
 *
 * Grid geometry is derived from the assets: p2_1..p2_4 and p4_1..p4_4 are
 * authored at 904x339, their native 1x cell size on the 1920 canvas. Two
 * columns plus the outer padding must therefore satisfy
 * 2*padding + gap === 1920 - 2*904 === 112, which `px-[0.5rem]` (50px, the
 * same inset the title uses) and `gap-3` (12px) solve exactly.
 */
export function Introduction1({ data }: Introduction1Props) {
  return (
    <div className="w-full h-svh bg-[#AFAFAF] text-white overflow-hidden">
      <div className="h-full flex flex-col justify-center items-center pt-60 md:pt-[15.56vh] pb-40 md:pb-[6.11vh]">
        <h2 className="text-[0.6rem] leading-none font-medium whitespace-pre-line text-center font-display px-[0.5rem]">
          {data.title}
        </h2>
        <div
          className={cn(
            "w-full flex-1 min-h-0 mt-8 md:mt-10 px-[0.45rem] md:px-[0.5rem]",
            "grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-3",
          )}
        >
          {data.data.map((item) => (
            <div key={item.image} className="group relative w-full h-full overflow-hidden">
              <div className="relative w-full h-full transition-all duration-1500 group-hover:scale-110">
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {/* Absolute so the two-line caption on p2_4 grows upward without moving the image. */}
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 text-2xl md:text-xl font-medium">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

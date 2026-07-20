/* eslint-disable @next/next/no-img-element -- full-bleed scene photo; next/image
   would re-run its loader and fight the rem-scaled layout, as elsewhere on this page. */
import type { PlugInHybridData } from "@/types/vehicle";

interface PlugInHybridProps {
  data: PlugInHybridData;
}

/**
 * A side-by-side card — copy on the left, photo on the right — dropped into the
 * T2 scroll flow. Styling follows the V23 "Play hard, relax more" band, retoned
 * to the T2's dark, lime-accented palette so it sits naturally between the
 * full-bleed image sections around it. Children carry `data-reveal-item` so they
 * ride the shared VehicleTemplate scroll reveal.
 */
export function PlugInHybrid({ data }: PlugInHybridProps) {
  return (
    <section className="w-full bg-neutral-950 text-white">
      <div className="mx-auto max-w-[19.2rem] px-12 md:px-15 py-[1.2rem] md:py-[1rem] grid gap-12 md:gap-[0.7rem] md:grid-cols-2 items-center">
        {/* Copy — left */}
        <div className="order-2 md:order-1">
          <span
            data-reveal-item
            className="inline-flex items-center rounded-full border border-brand-lime/60 bg-black/25 px-5 md:px-[0.18rem] py-1.5 md:py-[0.05rem] font-display text-xs md:text-[0.14rem] tracking-[0.22em] uppercase text-brand-lime"
          >
            {data.eyebrow}
          </span>
          <h2
            data-reveal-item
            className="mt-[0.3rem] md:mt-[0.24rem] font-display text-[0.6rem] md:text-[0.46rem] leading-[1.1] font-medium"
          >
            {data.title}
          </h2>
          <p
            data-reveal-item
            className="mt-[0.3rem] md:mt-[0.24rem] text-[0.3rem] md:text-[0.18rem] leading-relaxed text-white/60 max-w-[6.4rem]"
          >
            {data.body}
          </p>

          <dl data-reveal-item className="mt-[0.5rem] md:mt-[0.4rem] flex flex-wrap gap-x-[0.6rem] gap-y-[0.3rem]">
            {data.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-[0.06rem]">
                <dt className="order-2 text-[0.24rem] md:text-[0.14rem] text-white/50">{stat.label}</dt>
                <dd className="order-1 font-display text-[0.5rem] md:text-[0.3rem] leading-none">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Photo — right */}
        <div data-reveal-item className="order-1 md:order-2 overflow-hidden rounded-[0.16rem]">
          <img src={data.image} alt={data.title} loading="lazy" className="w-full object-cover" />
        </div>
      </div>
    </section>
  );
}

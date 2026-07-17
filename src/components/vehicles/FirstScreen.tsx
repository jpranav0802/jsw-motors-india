import { Fragment } from "react";

import { T2LogoIcon } from "@/components/icons";
import type { FirstScreenData } from "@/types/vehicle";

interface FirstScreenProps {
  data: FirstScreenData;
}

// The target's root here is w-screen, which it gets away with because its <html>
// is overflow:clip. This page really scrolls, so 100vw would overshoot by the
// scrollbar width and force a horizontal scrollbar; w-full is equivalent here.
export function FirstScreen({ data }: FirstScreenProps) {
  return (
    <div className="group relative w-full h-svh overflow-hidden md:mx-auto text-white">
      <picture className="h-full absolute inset-0 w-full h-full object-cover">
        <source media="(min-width: 1024px)" srcSet="/images/vehicles/image/T2.png" />
        <source media="(min-width: 768px)" srcSet="/images/vehicles/image/T2.png" />
        <source media="(min-width: 320px)" srcSet="/images/vehicles/image/T2_m.png" />
        <img
          src="/images/vehicles/image/T2.png"
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%, #000 100%)",
        }}
      />
      <div className="absolute top-90 md:top-[28.42vh] inset-x-8 md:right-auto md:left-1/2 md:-translate-x-1/2 text-center flex flex-col justify-center items-center gap-9">
        <div className="flex flex-col items-center gap-[0.2rem] md:gap-[0.14rem]">
          <span className="font-display text-[0.6rem] md:text-[0.34rem] leading-none tracking-[0.18em]">
            JETOUR
          </span>
          <T2LogoIcon className="text-8xl" />
        </div>
        <div className="flex flex-col items-center gap-[0.2rem] md:gap-[0.14rem]">
          <h2 className="text-2xl">{data.name}</h2>
          <span className="inline-flex items-center rounded-full border border-brand-lime/60 bg-black/25 backdrop-blur-sm px-5 md:px-[0.18rem] py-1.5 md:py-[0.05rem] font-display text-xs md:text-[0.14rem] tracking-[0.22em] uppercase text-brand-lime">
            Launching this Diwali!
          </span>
        </div>
      </div>
      <div className="absolute bottom-[9.07vh] inset-x-5 md:inset-x-8 md:right-auto md:left-1/2 md:-translate-x-1/2">
        {/* 2×2 grid on phones (the four stats won't fit in one row), a single
            divided row from md up. */}
        <dl className="grid grid-cols-2 gap-x-[0.3rem] gap-y-[0.4rem] md:flex md:items-center md:justify-center md:gap-12">
          {data.data.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <div aria-hidden="true" className="hidden md:block w-px self-stretch bg-white/40" />
              )}
              <div className="flex flex-col items-center gap-[0.08rem] md:gap-2 text-center">
                <dd className="font-display text-[0.4rem] md:text-4xl leading-none whitespace-nowrap">
                  {stat.value}
                </dd>
                <dt className="text-[0.22rem] md:text-sm">{stat.label}</dt>
              </div>
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}

import { Fragment } from "react";

import { T2LogoIcon } from "@/components/icons";
import type { FirstScreenData } from "@/types/vehicle";

interface FirstScreenProps {
  data: FirstScreenData;
}

export function FirstScreen({ data }: FirstScreenProps) {
  return (
    <div className="group relative w-screen h-svh overflow-hidden md:mx-auto text-white">
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
        <T2LogoIcon className="text-8xl" />
        <h2 className="text-2xl">{data.name}</h2>
      </div>
      <div className="absolute bottom-[9.07vh] inset-x-8 md:right-auto md:left-1/2 md:-translate-x-1/2">
        <dl className="flex items-center justify-center gap-8 md:gap-12">
          {data.data.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && <div aria-hidden="true" className="w-px self-stretch bg-white/40" />}
              <div className="flex flex-col items-center gap-2 text-center">
                <dd className="font-display text-4xl leading-none whitespace-nowrap">
                  {stat.value}
                </dd>
                <dt className="text-sm">{stat.label}</dt>
              </div>
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}

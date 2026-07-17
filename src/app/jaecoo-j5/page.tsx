/* eslint-disable @next/next/no-img-element -- large studio/scene photos; next/image
   would re-run its loader per frame and fight the rem-scaled layout. */
import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/jaecoo/Reveal";

export const metadata: Metadata = {
  title: "Jaecoo J5 — Bold, Premium, All-Electric SUV | JSW Motors India",
  description:
    "The Jaecoo J5 is a fully electric premium SUV — bold design, a silent glass cabin and striking alloys, built for every adventure.",
};

const FEATURES = [
  {
    image: "/jaecoo-j5/ex1.webp",
    title: "Pure Electric Identity",
    body: "A clean, sculpted silhouette and full-width light signatures announce a 100% electric identity from every angle.",
  },
  {
    image: "/jaecoo-j5/ex2.webp",
    title: "Silent Glass",
    body: "An expansive panoramic glass roof floods the cabin with light, while acoustic glazing keeps the outside world quiet.",
  },
  {
    image: "/jaecoo-j5/ex3.webp",
    title: "Striking Alloy Wheels",
    body: "Aero-optimised alloy wheels cut drag and add presence — purpose-built for the electric age.",
  },
];

const TRIMS = [
  {
    name: "Pure",
    price: "£27,505",
    body: "The essential J5 — premium comfort, a silent electric drive and the full suite of safety tech.",
  },
  {
    name: "Luxury",
    price: "£30,505",
    body: "Everything in Pure, plus elevated materials, a bigger glass roof and the top-tier sound system.",
  },
];

export default function JaecooJ5Page() {
  return (
    <main className="w-full bg-[#f6f6f6] text-[#1a1a1a]">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative w-full h-svh min-h-[6rem] overflow-hidden">
        <img src="/jaecoo-j5/hero.jpg" alt="Jaecoo J5 electric SUV" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />

        <div className="relative mx-auto flex h-full max-w-[19.2rem] flex-col items-center px-12 md:px-[0.7rem] pt-32 md:pt-[1.4rem] pb-16 md:pb-[0.8rem] text-white text-center">
          <Reveal className="flex flex-col items-center gap-6 md:gap-[0.2rem]">
            <span className="font-mono uppercase tracking-[0.24em] text-sm md:text-[0.13rem] text-white/80">
              Jaecoo J5 Electric
            </span>
            <img src="/jaecoo-j5/warranty.webp" alt="7 year warranty" className="h-14 md:h-[0.52rem] w-auto object-contain" />
          </Reveal>

          <div className="flex-1" />

          <Reveal className="w-full flex flex-col items-center gap-10 md:gap-[0.4rem]" delay={120}>
            <h1 className="max-w-[11rem] font-display text-3xl md:text-[0.56rem] leading-[1.1] font-medium">
              Go further, fully electric. The Jaecoo J5 is built for every adventure.
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-[0.16rem]">
              <Link
                href="/register"
                className="inline-flex items-center h-14 md:h-[0.56rem] px-8 md:px-[0.34rem] rounded-full bg-white text-black text-base md:text-[0.16rem] font-medium transition-transform duration-300 hover:scale-105"
              >
                Register interest
              </Link>
              {["Find a retailer", "Brochure", "Configure"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center h-14 md:h-[0.56rem] px-8 md:px-[0.34rem] rounded-full border border-white/60 text-base md:text-[0.16rem] font-medium text-white/90 cursor-pointer transition-colors duration-300 hover:bg-white/10"
                >
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Technological design ───────────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-12 md:px-[0.7rem] py-24 md:py-[1rem] text-center">
          <Reveal>
            <span className="font-mono uppercase tracking-[0.24em] text-sm md:text-[0.13rem] text-[#6b9b37]">
              Technological design
            </span>
            <h2 className="mt-6 md:mt-[0.24rem] mx-auto max-w-[11rem] font-display text-3xl md:text-[0.44rem] leading-[1.15] font-medium">
              Premium design meets intelligent electric power
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <img
              src="/jaecoo-j5/exterior.webp"
              alt="Jaecoo J5 in Granite White, three-quarter front view"
              className="mt-12 md:mt-[0.5rem] w-full object-contain"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Feature cards ──────────────────────────────────────── */}
      <section className="w-full bg-[#f6f6f6]">
        <div className="mx-auto max-w-[19.2rem] px-12 md:px-[0.7rem] py-24 md:py-[1rem]">
          <div className="grid gap-10 md:gap-[0.32rem] md:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 120}>
                <article className="h-full overflow-hidden rounded-[0.16rem] bg-white shadow-[0_0.04rem_0.24rem_rgba(0,0,0,0.06)]">
                  <div className="aspect-[596/735] overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-8 md:p-[0.32rem]">
                    <h3 className="font-display text-xl md:text-[0.24rem] font-medium">{feature.title}</h3>
                    <p className="mt-4 md:mt-[0.14rem] text-base md:text-[0.16rem] leading-relaxed text-black/60">
                      {feature.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Adventure starts here ──────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        <img src="/jaecoo-j5/adventure.webp" alt="Jaecoo J5 on a snowy landscape" className="w-full object-cover" />
        <div className="absolute inset-0 flex items-start justify-center pt-16 md:pt-[1rem] bg-gradient-to-b from-black/25 to-transparent">
          <Reveal>
            <h2 className="font-display text-3xl md:text-[0.5rem] leading-none font-medium text-white text-center drop-shadow-[0_0.02rem_0.1rem_rgba(0,0,0,0.4)]">
              Adventure starts here
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── Specifications & pricing ───────────────────────────── */}
      <section className="w-full bg-white">
        <div className="mx-auto max-w-[19.2rem] px-12 md:px-[0.7rem] py-24 md:py-[1rem]">
          <Reveal>
            <h2 className="font-display text-3xl md:text-[0.44rem] leading-none font-medium text-center">
              Specifications
            </h2>
          </Reveal>
          <div className="mt-12 md:mt-[0.5rem] grid gap-8 md:gap-[0.32rem] md:grid-cols-2">
            {TRIMS.map((trim, i) => (
              <Reveal key={trim.name} delay={i * 120}>
                <article className="flex h-full flex-col rounded-[0.16rem] border border-black/10 bg-[#f6f6f6] p-10 md:p-[0.4rem]">
                  <div className="font-display text-4xl md:text-[0.46rem] leading-none">{trim.price}</div>
                  <div className="mt-2 md:mt-[0.06rem] font-mono uppercase tracking-[0.2em] text-sm md:text-[0.13rem] text-[#6b9b37]">
                    {trim.name}
                  </div>
                  <p className="mt-6 md:mt-[0.2rem] flex-1 text-base md:text-[0.16rem] leading-relaxed text-black/60">
                    {trim.body}
                  </p>
                  <Link
                    href="/register"
                    className="mt-8 md:mt-[0.28rem] inline-flex w-fit items-center h-14 md:h-[0.56rem] px-8 md:px-[0.34rem] rounded-full bg-black text-white text-base md:text-[0.16rem] font-medium transition-opacity duration-300 hover:opacity-85"
                  >
                    Register interest
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 md:mt-[0.24rem] text-center text-sm md:text-[0.13rem] text-black/40">
            Prices shown are indicative UK on-the-road figures. India pricing to be confirmed.
          </p>
        </div>
      </section>
    </main>
  );
}

"use client";

import gsap from "gsap";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";

import { CountUp } from "@/components/vehicles/CountUp";
import type { FirstScreenData } from "@/types/vehicle";

interface FirstScreenProps {
  data: FirstScreenData;
}

const WORDMARK = "COMBAT";

// The target's root here is w-screen, which it gets away with because its <html>
// is overflow:clip. This page really scrolls, so 100vw would overshoot by the
// scrollbar width and force a horizontal scrollbar; w-full is equivalent here.
export function FirstScreen({ data }: FirstScreenProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Slow push-in on the photo, letters rising out of their masks, then the
      // supporting copy and the stat bar.
      tl.fromTo("[data-hero-photo]", { scale: 1.14 }, { scale: 1, duration: 2.8, ease: "power2.out" }, 0)
        .from("[data-hero-kicker]", { y: 16, opacity: 0, duration: 0.8 }, 0.2)
        .from("[data-hero-letter]", { yPercent: 110, duration: 1.1, stagger: 0.07 }, 0.3)
        .fromTo(
          "[data-hero-sweep]",
          { xPercent: -120, opacity: 1 },
          { xPercent: 120, opacity: 0, duration: 1.4, ease: "power2.inOut" },
          1.1,
        )
        .from("[data-hero-copy]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.9)
        .from("[data-hero-stat]", { y: 30, opacity: 0, duration: 0.9, stagger: 0.08 }, 1.2);

      // The pill keeps breathing after the intro so the launch date reads as live.
      gsap.to("[data-hero-badge-dot]", {
        scale: 1.8,
        opacity: 0,
        duration: 1.4,
        repeat: -1,
        ease: "power1.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="group relative w-full h-svh overflow-hidden md:mx-auto text-white">
      {/* The page's single primary heading. The visible wordmark is split into
          per-letter spans for the animation, so the readable heading lives here. */}
      <h1 className="sr-only">
        JSW Combat (Jetour T2) — {data.name}
      </h1>
      <picture data-hero-photo className="absolute inset-0 w-full h-full will-change-transform">
        <source media="(min-width: 768px)" srcSet="/images/vehicles/image/T2.png" />
        <source media="(min-width: 320px)" srcSet="/images/vehicles/image/T2_m.png" />
        <img
          src="/images/vehicles/image/T2.png"
          alt="JSW Combat plug-in hybrid SUV"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </picture>
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0) 22%, rgba(0, 0, 0, 0) 72%, #000 100%)",
        }}
      />
      <div className="absolute top-32 md:top-[11vh] inset-x-8 md:right-auto md:left-1/2 md:-translate-x-1/2 text-center flex flex-col justify-center items-center gap-4 md:gap-[0.24rem]">
        <div className="flex flex-col items-center gap-[0.12rem] md:gap-[0.08rem]">
          <span
            data-hero-kicker
            className="font-display text-[0.3rem] md:text-[0.2rem] leading-none tracking-[0.5em] text-white/80"
          >
            JSW
          </span>
          <div aria-hidden="true" className="relative overflow-hidden px-[0.06rem]">
            <span className="flex font-display text-[1.3rem] md:text-[1.2rem] leading-[0.95] tracking-[0.06em]">
              {WORDMARK.split("").map((letter, index) => (
                <span key={index} className="inline-block overflow-hidden">
                  <span data-hero-letter className="inline-block will-change-transform">
                    {letter}
                  </span>
                </span>
              ))}
            </span>
            {/* Lime light sweeping across the letters once they land. */}
            <span
              data-hero-sweep
              className="pointer-events-none absolute inset-y-0 -left-1/4 w-1/2 opacity-0 mix-blend-overlay"
              style={{
                background:
                  "linear-gradient(100deg, transparent 0%, rgba(215,252,2,0.9) 50%, transparent 100%)",
              }}
            />
          </div>
          {data.globalName && (
            <span data-hero-copy className="text-[0.22rem] md:text-sm text-white/70 tracking-wide">
              {data.globalName}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center gap-[0.2rem] md:gap-[0.14rem]">
          <h2 data-hero-copy className="text-2xl">
            {data.name}
          </h2>
          {data.badge && (
            <span
              data-hero-copy
              className="inline-flex items-center gap-3 md:gap-[0.1rem] rounded-full border border-brand-lime/60 bg-black/30 backdrop-blur-sm px-5 md:px-[0.18rem] py-1.5 md:py-[0.05rem] font-display text-xs md:text-[0.14rem] tracking-[0.22em] uppercase text-brand-lime"
            >
              <span aria-hidden="true" className="relative flex size-[0.12rem] md:size-[0.08rem]">
                <span data-hero-badge-dot className="absolute inset-0 rounded-full bg-brand-lime" />
                <span className="relative size-full rounded-full bg-brand-lime" />
              </span>
              {data.badge}
            </span>
          )}
          <div data-hero-copy className="mt-2 md:mt-[0.12rem] flex flex-wrap items-center justify-center gap-[0.16rem] md:gap-[0.12rem]">
            <Link
              href="/register"
              className="inline-flex items-center h-11 md:h-[0.58rem] px-8 md:px-[0.42rem] bg-white text-black text-sm md:text-[0.17rem] font-semibold rounded-full transition-colors duration-300 hover:bg-brand-lime"
            >
              Register your interest
            </Link>
            <Link
              href="/combat/specification"
              className="inline-flex items-center h-11 md:h-[0.58rem] px-8 md:px-[0.42rem] border border-white/60 text-white text-sm md:text-[0.17rem] font-semibold rounded-full backdrop-blur-sm transition-colors duration-300 hover:border-brand-lime hover:text-brand-lime"
            >
              Specifications
            </Link>
          </div>
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
              <div data-hero-stat className="flex flex-col items-center gap-[0.08rem] md:gap-2 text-center">
                <dd className="font-display text-[0.4rem] md:text-4xl leading-none whitespace-nowrap">
                  <CountUp value={stat.value} delay={1.3 + index * 0.08} />
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

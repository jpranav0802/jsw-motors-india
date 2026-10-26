"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import { CountUp } from "@/components/vehicles/CountUp";
import { cn } from "@/lib/utils";
import type { LaunchBriefData } from "@/types/vehicle";

interface LaunchBriefProps {
  data: LaunchBriefData;
}

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function remainingUntil(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

/**
 * Ticks once a second. Starts as `undefined` so the server render and the first
 * client render agree; `null` means the date has passed.
 */
function useCountdown(iso: string) {
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    const target = new Date(iso).getTime();
    const tick = () => setRemaining(remainingUntil(target));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [iso]);

  return remaining;
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Launch tracker band for the Combat: a live countdown to the unveil, a
 * milestone timeline whose lime rail draws itself as you scroll, and the
 * headline figures. Dark and lime to match the PlugInHybrid band below it.
 */
export function LaunchBrief({ data }: LaunchBriefProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const remaining = useCountdown(data.countdownTo);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // The rail fills with scroll progress through the timeline.
      gsap.fromTo(
        "[data-rail-fill]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-timeline]", start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        "[data-rail-fill-v]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-timeline]", start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      gsap.from("[data-milestone]", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-timeline]", start: "top 80%", once: true },
      });
      gsap.from("[data-fact]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-facts]", start: "top 85%", once: true },
      });
      // Slow drifting glow behind the countdown.
      gsap.to("[data-glow]", {
        xPercent: 18,
        yPercent: -12,
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const units: { label: string; value: string }[] = [
    { label: "Days", value: remaining ? String(remaining.days) : "--" },
    { label: "Hours", value: remaining ? pad(remaining.hours) : "--" },
    { label: "Minutes", value: remaining ? pad(remaining.minutes) : "--" },
    { label: "Seconds", value: remaining ? pad(remaining.seconds) : "--" },
  ];

  return (
    <div ref={rootRef} className="relative w-full overflow-hidden bg-black text-white">
      <div
        data-glow
        aria-hidden="true"
        className="pointer-events-none absolute -top-[2rem] right-[-2rem] size-[7rem] rounded-full opacity-20 blur-[1rem] bg-brand-lime"
      />

      <div className="relative mx-auto max-w-[19.2rem] px-12 md:px-15 py-[1.2rem] md:py-[1rem]">
        <div className="grid gap-[0.6rem] md:gap-[0.7rem] md:grid-cols-[1.1fr_1fr] items-center">
          {/* Copy */}
          <div>
            <span
              data-reveal-item
              className="inline-flex items-center rounded-full border border-brand-lime/60 px-5 md:px-[0.18rem] py-1.5 md:py-[0.05rem] font-display text-xs md:text-[0.14rem] tracking-[0.22em] uppercase text-brand-lime"
            >
              {data.eyebrow}
            </span>
            <h2
              data-reveal-item
              className="mt-[0.3rem] md:mt-[0.24rem] font-display text-[0.6rem] md:text-[0.52rem] leading-[1.05] font-medium"
            >
              {data.title}
            </h2>
            <p
              data-reveal-item
              className="mt-[0.3rem] md:mt-[0.24rem] text-[0.28rem] md:text-[0.18rem] leading-relaxed text-white/65 max-w-[7rem]"
            >
              {data.body}
            </p>
            <div data-reveal-item className="mt-[0.36rem] md:mt-[0.3rem]">
              <p className="font-mono uppercase tracking-[0.16em] text-[0.2rem] md:text-[0.11rem] text-white/40">
                Expected rivals
              </p>
              <ul className="mt-[0.14rem] md:mt-[0.1rem] flex flex-wrap gap-[0.12rem] md:gap-[0.08rem]">
                {data.rivals.map((rival) => (
                  <li
                    key={rival}
                    className="rounded-full border border-white/15 px-[0.18rem] md:px-[0.12rem] py-[0.06rem] md:py-[0.04rem] text-[0.22rem] md:text-[0.13rem] text-white/75"
                  >
                    {rival}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Countdown */}
          <div data-reveal-item className="rounded-[0.2rem] md:rounded-[0.16rem] border border-white/10 bg-white/[0.04] backdrop-blur-sm p-[0.36rem] md:p-[0.32rem]">
            <p className="font-mono uppercase tracking-[0.16em] text-[0.2rem] md:text-[0.11rem] text-white/50">
              {remaining === null ? "Unveiled" : "Countdown to unveil · 4 Dec 2026"}
            </p>
            {remaining === null ? (
              <p className="mt-[0.2rem] font-display text-[0.5rem] md:text-[0.4rem] text-brand-lime">
                The Combat has been unveiled.
              </p>
            ) : (
              <dl className="mt-[0.2rem] md:mt-[0.16rem] grid grid-cols-4 gap-[0.12rem] md:gap-[0.1rem]" aria-live="off">
                {units.map((unit) => (
                  <div
                    key={unit.label}
                    className="flex flex-col items-center rounded-[0.12rem] md:rounded-[0.08rem] bg-black/60 border border-white/10 py-[0.2rem] md:py-[0.16rem]"
                  >
                    <dd className="font-display tabular-nums text-[0.56rem] md:text-[0.5rem] leading-none text-brand-lime">
                      {unit.value}
                    </dd>
                    <dt className="mt-[0.08rem] md:mt-[0.06rem] text-[0.18rem] md:text-[0.12rem] uppercase tracking-[0.14em] text-white/50">
                      {unit.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
            <p className="mt-[0.2rem] md:mt-[0.14rem] text-[0.2rem] md:text-[0.12rem] text-white/40 leading-relaxed">
              Unveil date as reported by the Indian motoring press. JSW Motors has not yet published
              prices or opened bookings.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div data-timeline className="relative mt-[0.8rem] md:mt-[0.7rem]">
          {/* Horizontal rail, md+ */}
          <div aria-hidden="true" className="hidden md:block absolute left-0 right-0 top-[0.07rem] h-px bg-white/15">
            <div data-rail-fill className="h-full origin-left bg-brand-lime" />
          </div>
          {/* Vertical rail, phones */}
          <div aria-hidden="true" className="md:hidden absolute top-0 bottom-0 left-[0.09rem] w-px bg-white/15">
            <div data-rail-fill-v className="w-full h-full origin-top bg-brand-lime" />
          </div>

          <ol className="relative grid gap-[0.4rem] md:gap-[0.24rem] md:grid-cols-5">
            {data.timeline.map((milestone) => (
              <li key={milestone.title} data-milestone className="relative pl-[0.5rem] md:pl-0 md:pt-[0.36rem]">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-[0.04rem] md:top-0 size-[0.2rem] md:size-[0.14rem] rounded-full border-2",
                    milestone.highlight
                      ? "border-brand-lime bg-brand-lime shadow-[0_0_0.2rem_rgba(215,252,2,0.7)]"
                      : "border-white/40 bg-black",
                  )}
                />
                <p
                  className={cn(
                    "font-display text-[0.24rem] md:text-[0.15rem] tracking-[0.08em]",
                    milestone.highlight ? "text-brand-lime" : "text-white/55",
                  )}
                >
                  {milestone.date}
                </p>
                <p className="mt-[0.06rem] md:mt-[0.04rem] text-[0.3rem] md:text-[0.2rem] font-medium">{milestone.title}</p>
                <p className="mt-[0.06rem] md:mt-[0.04rem] text-[0.24rem] md:text-[0.14rem] leading-relaxed text-white/55">
                  {milestone.note}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Headline figures */}
        <dl
          data-facts
          className="mt-[0.8rem] md:mt-[0.7rem] grid grid-cols-2 md:grid-cols-6 border-t border-white/10"
        >
          {data.facts.map((fact) => (
            <div
              key={fact.label}
              data-fact
              className="group/fact flex flex-col gap-[0.06rem] border-b border-white/10 md:border-b-0 md:border-r last:border-r-0 py-[0.3rem] md:py-[0.24rem] pr-[0.2rem] md:px-[0.16rem] md:first:pl-0 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              <dd className="order-1 font-display text-[0.5rem] md:text-[0.34rem] leading-none transition-colors duration-300 group-hover/fact:text-brand-lime">
                <CountUp value={fact.value} onScroll />
              </dd>
              <dt className="order-2 text-[0.22rem] md:text-[0.13rem] text-white/50">{fact.label}</dt>
            </div>
          ))}
        </dl>

        <p className="mt-[0.3rem] md:mt-[0.2rem] text-[0.2rem] md:text-[0.12rem] text-white/40">
          Figures are expected or claimed and may change at launch. Reported by{" "}
          {data.sources.map((source, index) => (
            <span key={source.href}>
              {index > 0 && (index === data.sources.length - 1 ? " and " : ", ")}
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline underline-offset-2 hover:text-white"
              >
                {source.label}
              </a>
            </span>
          ))}
          .
        </p>
      </div>
    </div>
  );
}

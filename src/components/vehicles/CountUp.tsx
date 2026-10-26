"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

interface CountUpProps {
  /** e.g. "360 hp", "1,100 km", "1.5T PHEV". A value with no leading number shows as-is. */
  value: string | number;
  /** Seconds. */
  duration?: number;
  /** Start once the element scrolls into view instead of on mount. */
  onScroll?: boolean;
  delay?: number;
  className?: string;
}

const LEADING_NUMBER = /^(\d[\d,]*(?:\.\d+)?)([^]*)$/;

/**
 * Counts the leading number of a stat up from zero, keeping the suffix and the
 * original thousands separators / decimal places. Server HTML has the final
 * value, so nothing is lost without JS or with reduced motion.
 */
export function CountUp({ value, duration = 1.6, onScroll = false, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const text = String(value);

  useEffect(() => {
    const el = ref.current;
    const match = text.match(LEADING_NUMBER);
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const [, numberPart, suffix] = match;
    const target = Number(numberPart.replace(/,/g, ""));
    const decimals = numberPart.includes(".") ? numberPart.split(".")[1].length : 0;
    const grouped = numberPart.includes(",");
    const format = (n: number) =>
      (grouped
        ? n.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) + suffix;

    gsap.registerPlugin(ScrollTrigger);
    const counter = { n: 0 };
    el.textContent = format(0);

    const tween = gsap.to(counter, {
      n: target,
      duration,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = format(counter.n);
      },
      onComplete: () => {
        el.textContent = text;
      },
      ...(onScroll ? { scrollTrigger: { trigger: el, start: "top 85%", once: true } } : {}),
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = text;
    };
  }, [text, duration, delay, onScroll]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

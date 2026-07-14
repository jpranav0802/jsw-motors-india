"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Drives the page with Lenis and hands scroll control to GSAP.
 *
 * The two must share a clock: Lenis is stepped from gsap.ticker rather than its
 * own rAF, and ScrollTrigger is updated from Lenis's scroll event. Running them
 * on separate loops makes pinned sections jitter by a frame. `lagSmoothing(0)`
 * stops GSAP from swallowing a long frame and desyncing the two.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      // Slightly weighted easing: fast pickup, long settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

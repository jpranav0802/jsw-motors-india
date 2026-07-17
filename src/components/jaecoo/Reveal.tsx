"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
}

/**
 * Fades its children up as they scroll into view.
 *
 * Deliberately driven by a scroll listener + a mount check rather than an
 * IntersectionObserver: a fast (Lenis-smoothed) scroll can skip an observer's
 * intersection window and leave content stuck invisible. Here the element
 * reveals the moment its top passes 90% of the viewport height — and stays
 * revealed even if it has already scrolled past — so nothing can get stuck.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const inView = () => el.getBoundingClientRect().top < window.innerHeight * 0.9;
    const onScroll = () => {
      if (inView()) {
        setShown(true);
        window.removeEventListener("scroll", onScroll);
      }
    };

    // Reveal above-the-fold content on the next frame; watch scroll for the rest.
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [shown]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

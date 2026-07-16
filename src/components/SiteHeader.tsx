"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Book", href: "/book" },
];

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M6 9.5 12 15l6-5.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  // The home page opens on a full-bleed hero the bar sits over (kept legible by
  // the scrim below); every other route has no hero, so the bar goes solid black.
  // Either way it stays fixed and visible from load — it never hides on scroll.
  const overHero = pathname === "/";

  return (
    <header
      className={cn(
        "group fixed top-0 left-0 right-0 z-50 duration-300 text-white",
        "md:hover:bg-white md:hover:text-black",
        "transition-[background-color,color]",
        !overHero && "bg-black",
      )}
    >
      {/* The bar is white-on-transparent and floats over sections of any
          brightness — including the near-white 3D hall, where it would
          otherwise vanish. This scrim keeps it legible, and retracts on hover
          because the bar turns solid white then. */}
      {overHero && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 to-transparent transition-opacity duration-300 group-hover:opacity-0"
        />
      )}

      <nav className="flex items-center justify-between px-12 md:px-[0.7rem] h-20 md:h-[0.75rem]">
        <div className="flex items-center gap-18 h-full">
          <Link href="/" className="cursor-pointer" aria-label="JSW Auto — home">
            <span className="font-display text-2xl tracking-[0.12em] leading-none">JSW</span>
          </Link>

          <div className="hidden md:flex items-center gap-[0.61rem] h-full">
            {NAV.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative cursor-pointer py-1 font-medium",
                    "after:content-[''] after:h-[0.02rem] after:bg-current after:absolute after:-bottom-1 after:left-0",
                    "after:transition-all after:duration-500 after:ease-out",
                    active ? "after:w-full" : "after:w-0 hover:after:w-full",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <button type="button" className="flex items-center gap-1 cursor-pointer text-base">
            EN
            <ChevronDownIcon className="size-4" />
          </button>
          <button type="button" aria-label="Language" className="cursor-pointer">
            <GlobeIcon className="size-6" />
          </button>
          <Link
            href="/book"
            className="md:hidden font-medium"
            aria-label="Book"
          >
            Book
          </Link>
        </div>
      </nav>
    </header>
  );
}

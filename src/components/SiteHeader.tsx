"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const NAV = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "EV Guides", href: "/guides" },
  { label: "About", href: "/about" },
  { label: "Register", href: "/register" },
  { label: "Contact", href: "/contact" },
];

interface Vehicle {
  name: string;
  /** Omitted for models that have no page yet — shown as "coming soon". */
  href?: string;
  image?: string;
  /** Launch-status tagline shown under the model name. */
  caption?: string;
}

const VEHICLES: Vehicle[] = [
  // The T2 studio shot reuses the exterior spin's sun-orange hero frame.
  { name: "Jetour T2", href: "/", image: "/exterior/T2/sun_orange/23.png", caption: "Launching this Diwali!" },
  { name: "Jaecoo J5", href: "/jaecoo-j5", image: "/jaecoo-j5/exterior.webp", caption: "Coming Soon!" },
  { name: "V23", href: "/v23", image: "/v23/side-profile.png", caption: "Coming Soon!" },
];

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

const NAV_LINK =
  "relative cursor-pointer py-1 font-medium after:content-[''] after:h-[0.02rem] " +
  "after:bg-current after:absolute after:-bottom-1 after:left-0 after:transition-all " +
  "after:duration-500 after:ease-out";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // The home page opens on the T2 hero, which the bar sits over transparently.
  const overHero = pathname === "/";

  // Close the Vehicles panel on navigation — done as a render-time convergence
  // (React's documented alternative to a prop-syncing effect) so it never trips
  // the set-state-in-effect rule.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
    if (mobileOpen) setMobileOpen(false);
  }

  // Close the panels on Escape or a click outside the header.
  useEffect(() => {
    if (!open && !mobileOpen) return;
    const closeAll = () => {
      setOpen(false);
      setMobileOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    const onDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) closeAll();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, mobileOpen]);

  // Transparent over the hero, solid black elsewhere, solid white while the
  // Vehicles panel is open so the bar blends into the panel below it.
  const navColor =
    open || mobileOpen
      ? "bg-white text-black"
      : overHero
        ? "text-white md:hover:bg-white md:hover:text-black"
        : "bg-black text-white md:hover:bg-white md:hover:text-black";

  const renderNavLink = (item: (typeof NAV)[number]) => {
    const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn(NAV_LINK, active ? "after:w-full" : "after:w-0 hover:after:w-full")}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header ref={headerRef} className="group fixed top-0 left-0 right-0 z-50">
      {/* Permanent disclaimer — this is a fan-made clone, not an official site. */}
      <div className="flex items-center justify-center bg-neutral-950 h-[0.58rem] md:h-[0.3rem] px-4">
        {/* The strip is a single short line, so the full wording only fits from
            the desktop canvas up; the phone gets an abbreviated version of the
            same notice. The full disclaimer sits in the footer on every page. */}
        <p className="text-center font-mono uppercase tracking-[0.16em] text-[0.14rem] md:text-[0.11rem] text-neutral-400 whitespace-nowrap">
          <span className="md:hidden">
            Independent <span className="text-neutral-600">·</span> Not JSW-affiliated{" "}
            <span className="text-neutral-600">·</span>{" "}
            <span className="text-brand-lime">No payments</span>
          </span>
          <span className="hidden md:inline">
            Independent portal <span className="text-neutral-600">·</span> Not affiliated with JSW
            Group or JSW MG Motor India <span className="text-neutral-600">·</span>{" "}
            <span className="text-brand-lime">No payments, ever</span>
          </span>
        </p>
      </div>

      {/* Nav bar */}
      <div className={cn("relative transition-[background-color,color] duration-300", navColor)}>
        {overHero && !open && (
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-b from-black/55 to-transparent transition-opacity duration-300 group-hover:opacity-0"
          />
        )}

        <nav className="flex items-center justify-between px-[0.45rem] md:px-[0.7rem] h-[1.2rem] md:h-[0.75rem]">
          <div className="flex items-center gap-[0.6rem] md:gap-[0.5rem] h-full">
            <Link href="/" className="cursor-pointer" aria-label="JSW Motors India — home">
              <span className="font-display text-2xl tracking-[0.1em] leading-none whitespace-nowrap">
                JSW Motors
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-[0.5rem] h-full">
              {renderNavLink(NAV[0])}

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className={cn(NAV_LINK, "flex items-center gap-[0.06rem]", open ? "after:w-full" : "after:w-0 hover:after:w-full")}
              >
                Models &amp; Specs
                <ChevronDownIcon
                  className={cn("size-[0.16rem] transition-transform duration-300", open && "rotate-180")}
                />
              </button>

              {NAV.slice(1).map(renderNavLink)}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="md:hidden grid place-items-center size-[0.6rem] -mr-[0.1rem]"
          >
            <span className="relative block w-[0.44rem] h-[0.32rem]">
              <span
                className={cn(
                  "absolute left-0 h-[0.03rem] w-full bg-current transition-all duration-300",
                  mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1/2 -translate-y-1/2 h-[0.03rem] w-full bg-current transition-opacity duration-300",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[0.03rem] w-full bg-current transition-all duration-300",
                  mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </nav>

        {/* Vehicles mega-menu */}
        {open && (
          <div className="absolute left-0 right-0 top-full bg-white text-black border-t border-black/10 shadow-[0_0.12rem_0.4rem_rgba(0,0,0,0.08)]">
            <div className="px-[0.45rem] md:px-[0.7rem] py-[0.5rem] md:py-[0.4rem]">
              <p className="font-display text-[0.34rem] md:text-[0.18rem] text-black/40 mb-[0.4rem] md:mb-[0.24rem]">
                All Models
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-[0.36rem] md:gap-[0.24rem]">
                {VEHICLES.map((vehicle) => (
                  <li key={vehicle.name}>
                    <VehicleCard vehicle={vehicle} onNavigate={() => setOpen(false)} />
                  </li>
                ))}
              </ul>

              <div className="mt-[0.36rem] md:mt-[0.24rem] border-t border-black/10 pt-[0.24rem] md:pt-[0.16rem] flex flex-wrap gap-x-[0.4rem] gap-y-[0.14rem] text-[0.24rem] md:text-sm">
                <Link
                  href="/T2/specification"
                  onClick={() => setOpen(false)}
                  className="text-black/60 underline underline-offset-4 transition-colors hover:text-black"
                >
                  Jetour T2 — full specifications &amp; analysis
                </Link>
                <Link
                  href="/guides"
                  onClick={() => setOpen(false)}
                  className="text-black/60 underline underline-offset-4 transition-colors hover:text-black"
                >
                  EV guides &amp; comparisons
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white text-black border-t border-black/10 max-h-[calc(100svh-1.35rem)] overflow-y-auto">
            <nav className="px-[0.7rem] py-[0.4rem] flex flex-col">
              <Link href="/" className="py-[0.3rem] text-[0.34rem] font-medium border-b border-black/10">
                Home
              </Link>
              <div className="py-[0.3rem] border-b border-black/10">
                <p className="font-mono uppercase tracking-[0.16em] text-[0.22rem] text-black/40 mb-[0.24rem]">
                  Models &amp; Specs
                </p>
                <ul className="flex flex-col gap-[0.3rem]">
                  {VEHICLES.map((vehicle) => (
                    <li key={vehicle.name}>
                      <MobileVehicleRow vehicle={vehicle} onNavigate={() => setMobileOpen(false)} />
                    </li>
                  ))}
                </ul>
                <Link
                  href="/T2/specification"
                  className="mt-[0.3rem] inline-block text-[0.26rem] text-black/60 underline underline-offset-4"
                >
                  Jetour T2 — full specifications
                </Link>
              </div>
              <Link href="/news" className="py-[0.3rem] text-[0.34rem] font-medium border-b border-black/10">
                News
              </Link>
              <Link href="/guides" className="py-[0.3rem] text-[0.34rem] font-medium border-b border-black/10">
                EV Guides
              </Link>
              <Link href="/about" className="py-[0.3rem] text-[0.34rem] font-medium border-b border-black/10">
                About
              </Link>
              <Link href="/contact" className="py-[0.3rem] text-[0.34rem] font-medium border-b border-black/10">
                Contact
              </Link>
              <Link
                href="/register"
                className="mt-[0.4rem] inline-flex items-center justify-center h-[0.9rem] rounded-full bg-black text-white text-[0.32rem] font-medium"
              >
                Register your interest
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function MobileVehicleRow({ vehicle, onNavigate }: { vehicle: Vehicle; onNavigate: () => void }) {
  const body = (
    <>
      <div className="size-[1.1rem] shrink-0 rounded-[0.12rem] bg-neutral-100 grid place-items-center overflow-hidden">
        {vehicle.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- static studio frame
          <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain" />
        ) : null}
      </div>
      <div>
        <div className="font-display text-[0.3rem]">{vehicle.name}</div>
        {vehicle.caption && (
          <div className="mt-[0.04rem] font-mono uppercase tracking-[0.12em] text-[0.16rem] text-[#6b9b37]">
            {vehicle.caption}
          </div>
        )}
      </div>
    </>
  );
  if (vehicle.href) {
    return (
      <Link href={vehicle.href} onClick={onNavigate} className="flex items-center gap-[0.3rem]">
        {body}
      </Link>
    );
  }
  return <div className="flex items-center gap-[0.3rem] opacity-60">{body}</div>;
}

function VehicleCard({ vehicle, onNavigate }: { vehicle: Vehicle; onNavigate: () => void }) {
  const inner = (
    <>
      <div className="aspect-video bg-neutral-100 grid place-items-center overflow-hidden">
        {vehicle.image ? (
          // eslint-disable-next-line @next/next/no-img-element -- static studio frame, no loader needed
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-[1.03]"
          />
        ) : (
          <span className="font-mono text-[0.2rem] md:text-xs uppercase tracking-widest text-black/30">Coming soon</span>
        )}
      </div>
      <div className="mt-[0.2rem] md:mt-[0.16rem] text-center font-display text-[0.5rem] md:text-[0.24rem]">
        {vehicle.name}
      </div>
      {vehicle.caption && (
        <div className="mt-[0.06rem] md:mt-[0.06rem] text-center font-mono uppercase tracking-[0.16em] text-xs md:text-[0.12rem] text-[#6b9b37]">
          {vehicle.caption}
        </div>
      )}
    </>
  );

  if (vehicle.href) {
    return (
      <Link href={vehicle.href} onClick={onNavigate} className="block group/card">
        {inner}
      </Link>
    );
  }
  return <div className="opacity-60">{inner}</div>;
}

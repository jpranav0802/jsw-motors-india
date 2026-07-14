"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { JetourLogoIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface MenuLink {
  label: string;
  href: string;
  image?: string;
}

interface MenuGroup {
  label: string;
  href: string;
  links: MenuLink[];
}

const MENU: MenuGroup[] = [
  {
    label: "Vehicles",
    href: "/vehicles",
    links: [
      { label: "JETOUR G700", href: "/G700", image: "/images/header/vehicles/g700.png" },
      { label: "JETOUR T1", href: "/T1", image: "/images/header/vehicles/T1.png" },
      { label: "JETOUR T1 i-DM", href: "/T1iDM", image: "/images/header/vehicles/T1iDM.png" },
      { label: "JETOUR T2", href: "/T2", image: "/images/header/vehicles/T2.png" },
      { label: "JETOUR T2 i-DM", href: "/T2iDM", image: "/images/header/vehicles/T2iDM.png" },
    ],
  },
  {
    label: "About JETOUR",
    href: "/about",
    links: [
      { label: "Introduction", href: "/about/introduction" },
      { label: "G Series", href: "/about/g-series" },
      { label: "JMK Series", href: "/about/jmk-series" },
      { label: "Technology", href: "/about/technology" },
      { label: "JETOUR Life", href: "/about/jetour-life" },
    ],
  },
  {
    label: "Explore",
    href: "/explore",
    links: [
      { label: "News", href: "/explore/news" },
      { label: "Owners", href: "/explore/owners" },
      { label: "History", href: "/explore/history" },
      { label: "Global Network", href: "/explore/global-network" },
    ],
  },
  { label: "Contact Us", href: "/contact", links: [] },
];

/** Matches the target: the bar is hidden until the first scroll, then slides in. */
const HIDDEN_OFFSET = "-56.1685px";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 9.5 12 15l6-5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function HubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 12h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => setRevealed(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-background duration-300 text-white md:hover:bg-white md:hover:text-black",
        "transition-all",
      )}
      style={{
        opacity: revealed ? 1 : 0,
        transform: `translateY(${revealed ? "0px" : HIDDEN_OFFSET})`,
      }}
    >
      <nav className="flex items-center justify-between px-12 md:px-[0.7rem] h-20 md:h-[0.75rem]">
        <div className="flex items-center gap-18 h-full">
          <Link href="/" className="cursor-pointer">
            <JetourLogoIcon className="w-[1.67rem] h-8" />
          </Link>

          <div className="hidden md:flex items-center gap-[0.61rem] h-full">
            {MENU.map((group) => (
              <div key={group.label} className="group relative h-full flex items-center">
                <Link
                  href={group.href}
                  className="relative cursor-pointer py-1 font-medium after:content-[''] after:h-[0.02rem] after:bg-foreground after:absolute after:-bottom-1 after:left-0 hover:after:w-full hover:after:transition-all hover:after:duration-500 hover:after:ease-out after:w-0"
                >
                  {group.label}
                </Link>

                {group.links.length > 0 && (
                  <div className="fixed top-[0.75rem] left-0 w-full overflow-hidden grid transition-[grid-template-rows] duration-500 ease-out grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                    <div className="w-full min-h-0 overflow-hidden bg-white text-black">
                      <div className="flex gap-[0.4rem] px-[0.5rem] py-[0.4rem]">
                        {group.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="flex flex-col gap-[0.16rem] cursor-pointer transition-colors duration-300 font-medium hover:text-black/60"
                          >
                            {link.image && (
                              <img
                                src={link.image}
                                alt=""
                                loading="lazy"
                                className="w-[2.5rem] h-auto object-contain"
                              />
                            )}
                            <span className="text-base">{link.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
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
          <button type="button" aria-label="Owner hub" className="cursor-pointer">
            <HubIcon className="size-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}

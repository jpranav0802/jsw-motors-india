import Link from "next/link";

import { affiliationDisclaimer, contactEmail } from "@/lib/editorial";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Models & Specs",
    links: [
      { label: "Jetour T2", href: "/" },
      { label: "T2 specifications", href: "/T2/specification" },
      { label: "Jaecoo J5", href: "/jaecoo-j5" },
      { label: "JSW V23", href: "/v23" },
    ],
  },
  {
    title: "Editorial",
    links: [
      { label: "Auto news", href: "/news" },
      { label: "EV guides", href: "/guides" },
      { label: "FAQs", href: "/faqs" },
      { label: "About us", href: "/about" },
      { label: "Register your interest", href: "/register" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-white text-black">
      <div className="px-[0.45rem] md:px-[0.7rem] py-[0.8rem] md:py-[0.6rem]">
        <div className="mx-auto w-full max-w-[19.2rem] border-t border-black/10 pt-12 md:pt-[0.4rem]">
          <div className="grid gap-[0.6rem] md:gap-[0.4rem] sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p className="font-display text-[0.4rem] md:text-[0.24rem] tracking-[0.06em]">
                JSW Motors India
              </p>
              <p className="mt-[0.16rem] md:mt-[0.1rem] text-[0.24rem] md:text-sm text-black/50 max-w-[4.4rem]">
                Independent news, specifications, range analysis and buying guides for India&apos;s
                incoming new-energy vehicles.
              </p>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-[0.2rem] md:mt-[0.12rem] inline-block text-[0.24rem] md:text-sm text-black/60 underline underline-offset-4 transition-colors hover:text-black"
              >
                {contactEmail}
              </a>
            </div>

            {COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-mono uppercase tracking-[0.16em] text-[0.2rem] md:text-[0.11rem] text-black/40">
                  {column.title}
                </p>
                <ul className="mt-[0.24rem] md:mt-[0.16rem] flex flex-col gap-[0.16rem] md:gap-[0.1rem]">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.24rem] md:text-sm text-black/60 transition-colors duration-300 hover:text-black"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-[0.6rem] md:mt-[0.4rem] border-t border-black/10 pt-[0.3rem] md:pt-[0.2rem] flex flex-col gap-[0.16rem] md:gap-[0.1rem]">
            <p className="text-[0.22rem] md:text-[0.13rem] leading-relaxed text-black/45 max-w-[9.6rem]">
              {affiliationDisclaimer}
            </p>
            <p className="text-[0.22rem] md:text-[0.13rem] text-black/35">
              © {new Date().getFullYear()} jswmotorsindia.com · All product and brand names are the
              property of their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

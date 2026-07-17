import Link from "next/link";

const LINKS = [
  { label: "FAQs", href: "/faqs" },
  { label: "Cookies", href: "/cookies" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Register", href: "/register" },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-white text-black">
      <div className="px-[0.45rem] md:px-[0.7rem] py-[0.8rem] md:py-[0.6rem]">
        <div className="border-t border-black/10 pt-12 md:pt-[0.4rem] flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-6">
          <p className="text-[0.24rem] md:text-sm text-black/60">© Copyright 2026 JSW Motors India</p>

          <nav className="flex flex-wrap items-center gap-x-10 gap-y-4 md:gap-x-[0.36rem]">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[0.24rem] md:text-sm text-black/60 transition-colors duration-300 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";

import { affiliationDisclaimer } from "@/lib/editorial";

/**
 * The full affiliation disclaimer, rendered verbatim. Sits at the bottom of the
 * home page and on any page where a reader might mistake this portal for a
 * manufacturer property.
 */
export function AffiliationNotice({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className={
        "border p-[0.36rem] md:p-[0.24rem] " +
        (dark ? "border-white/15 bg-white/[0.03]" : "border-black/15 bg-neutral-50")
      }
    >
      <p
        className={
          "font-mono uppercase tracking-[0.16em] text-[0.18rem] md:text-[0.11rem] " +
          (dark ? "text-white/40" : "text-black/40")
        }
      >
        Disclaimer
      </p>
      <p
        className={
          "mt-[0.16rem] md:mt-[0.1rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed " +
          (dark ? "text-white/70" : "text-black/70")
        }
      >
        {affiliationDisclaimer}
      </p>
      <p className="mt-[0.16rem] md:mt-[0.1rem] text-[0.24rem] md:text-sm">
        <Link
          href="/disclaimer"
          className={
            "underline underline-offset-2 transition-colors " +
            (dark ? "text-white/60 hover:text-white" : "text-black/60 hover:text-black")
          }
        >
          Read the full disclaimer
        </Link>
      </p>
    </div>
  );
}

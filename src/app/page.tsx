import type { Metadata } from "next";
import Link from "next/link";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { VehicleTemplate } from "@/components/vehicles/VehicleTemplate";
import { featuredArticles } from "@/data/articles";
import { siteName } from "@/lib/editorial";
import { t2Sections } from "@/data/t2";

export const metadata: Metadata = {
  // `absolute` opts out of the layout's "%s | <siteName>" template so the home
  // page reads as a subject line, not a brand claim.
  title: {
    absolute: `JSW Combat (Jetour T2) — Launch Date, Price & Specs | ${siteName}`,
  },
  description:
    "Independent coverage of the JSW Combat, the India name for the Jetour T2: unveil on 4 December 2026, expected ₹30–50 lakh price, 360 hp plug-in hybrid with 90 km electric range, colours and specs. Unofficial; not affiliated with JSW, MG, Chery or Jetour.",
  alternates: { canonical: "/" },
};

/**
 * The home page is the JSW Combat (Jetour T2) experience — it is the headline product and
 * what visitors arrive for. The editorial portal framing lives on /guides; the
 * strip below just links the two together and carries the site-wide disclaimer.
 */
export default function Home() {
  const featured = featuredArticles(3);

  return (
    <>
      <VehicleTemplate sections={t2Sections} />

      <section className="w-full bg-white text-black border-t border-black/10">
        <div className="mx-auto w-full max-w-[19.2rem] px-[0.45rem] md:px-[0.7rem] py-[1rem] md:py-[0.8rem]">
          <div className="flex flex-wrap items-end justify-between gap-[0.24rem]">
            <div>
              <h2 className="font-display text-[0.56rem] md:text-[0.36rem] leading-none font-medium">
                Latest news &amp; guides
              </h2>
              <p className="mt-[0.2rem] md:mt-[0.14rem] max-w-[7.2rem] text-[0.26rem] md:text-[0.16rem] leading-relaxed text-black/55">
                Independent news, specifications, range analysis and buying guides for upcoming JSW
                MG Motor India and NEV platforms — updated daily with headlines from across the
                Indian motoring press.
              </p>
            </div>
            <Link
              href="/guides"
              className="text-[0.26rem] md:text-base underline underline-offset-4 text-black/60 transition-colors hover:text-black"
            >
              All news &amp; guides
            </Link>
          </div>

          <div className="mt-[0.6rem] md:mt-[0.4rem] grid gap-[0.6rem] md:gap-[0.34rem] sm:grid-cols-2 md:grid-cols-3">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          <div className="mt-[0.8rem] md:mt-[0.5rem] max-w-[10.8rem]">
            <AffiliationNotice />
          </div>
        </div>
      </section>
    </>
  );
}

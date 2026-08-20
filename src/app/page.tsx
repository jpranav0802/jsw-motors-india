import type { Metadata } from "next";
import Link from "next/link";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { VehicleTemplate } from "@/components/vehicles/VehicleTemplate";
import { featuredArticles } from "@/data/articles";
import { t2Sections } from "@/data/t2";

export const metadata: Metadata = {
  // `absolute` opts out of the layout's "%s | JSW Motors India" template, which
  // would otherwise suffix the brand onto a title that already carries it.
  title: { absolute: "JSW Motors India | Official Site" },
  description:
    "The Jetour T2 rugged adventure SUV in India — 1.5T and 2.0T Kunpeng powertrains, automatic XWD, 220 mm ground clearance and 6+X driving modes. Explore the exterior and interior, read the full specification, and follow the JSW MG NEV lineup.",
  alternates: { canonical: "/" },
};

/**
 * The home page is the Jetour T2 experience — it is the headline product and
 * what visitors arrive for. The editorial portal framing lives on /news; the
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
              href="/news"
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

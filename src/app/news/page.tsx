import type { Metadata } from "next";
import Link from "next/link";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { NewsList } from "@/components/editorial/NewsList";
import { PageShell } from "@/components/PageShell";
import { featuredArticles } from "@/data/articles";
import { getNews } from "@/lib/news";

/**
 * Refresh window for the aggregated headlines, in seconds. Six hours means the
 * page picks up new stories several times a day on its own — no rebuild, no
 * manual step. Next serves the cached page until the window lapses, then
 * regenerates it on the next request.
 */
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Auto News — Jetour, JSW MG & India NEV Updates",
  description:
    "Daily automotive news for India, with JSW, Jetour, Jaecoo and iCAR stories pulled to the top — launches, spy shots, rumours and EV industry updates, aggregated from Indian motoring publishers and updated automatically.",
  alternates: { canonical: "/news" },
};

const COVERAGE = [
  {
    title: "Specifications",
    body: "Full trim-by-trim spec sheets with written analysis, not bare tables copied from a brochure.",
  },
  {
    title: "Range analysis",
    body: "What manufacturer range claims actually mean on Indian roads, in Indian heat, at Indian speeds.",
  },
  {
    title: "Buying guides",
    body: "Cost per kilometre, charging economics, state road-tax exemptions and honest competitor comparisons.",
  },
  {
    title: "Launch tracking",
    body: "What has been announced, what has been homologated, and what is still a rumour — labelled as such.",
  },
];

export default async function NewsPage() {
  const [news, featured] = await Promise.all([
    getNews(revalidate),
    Promise.resolve(featuredArticles(6)),
  ]);

  return (
    <PageShell
      title="Auto news"
      intro="Independent news, specifications, range analysis and buying guides for upcoming JSW MG Motor India and NEV platforms — plus the day's automotive headlines from across the Indian motoring press, with Jetour, JSW, Jaecoo and iCAR stories pulled to the top."
    >
      {/* What this portal covers — the framing that used to sit on the home page. */}
      <section className="max-w-[10.8rem] border-y border-black/10 py-[0.5rem] md:py-[0.34rem]">
        <dl className="grid gap-[0.4rem] md:gap-[0.3rem] sm:grid-cols-2 md:grid-cols-4">
          {COVERAGE.map((item) => (
            <div key={item.title}>
              <dt className="font-display text-[0.32rem] md:text-[0.19rem]">{item.title}</dt>
              <dd className="mt-[0.12rem] md:mt-[0.08rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/55">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Auto-updating headline feed. */}
      <section className="mt-[0.8rem] md:mt-[0.6rem]">
        <div className="flex flex-wrap items-end justify-between gap-[0.2rem]">
          <h2 className="font-display text-[0.5rem] md:text-[0.32rem] leading-none font-medium">
            Latest headlines
          </h2>
          <p className="font-mono uppercase tracking-[0.14em] text-[0.18rem] md:text-[0.11rem] text-black/40">
            Updated automatically · {news.sourcesLive}/{news.sourcesTotal} sources live
          </p>
        </div>

        <div className="mt-[0.5rem] md:mt-[0.34rem]">
          <NewsList items={news.items} />
        </div>

        <p className="mt-[0.4rem] md:mt-[0.26rem] max-w-[8.4rem] text-[0.22rem] md:text-sm leading-relaxed text-black/45">
          Headlines above are aggregated from public RSS feeds published by ETAuto, Rushlane,
          MotorBeam, GaadiWaadi and AutoPunditz. We show the headline, a short extract and a link to
          the original — full articles stay with their publishers, and all rights remain theirs.
          Stories naming JSW, Jetour, Jaecoo or iCAR are ranked first; nothing here is written or
          endorsed by us, and inclusion is not verification. Our own reporting is signed and lives in
          the guides below.
        </p>
      </section>

      {/* Our own long-form work. */}
      <section className="mt-[1rem] md:mt-[0.7rem] border-t border-black/10 pt-[0.6rem] md:pt-[0.4rem]">
        <div className="flex flex-wrap items-end justify-between gap-[0.24rem]">
          <h2 className="font-display text-[0.5rem] md:text-[0.32rem] leading-none font-medium">
            Our guides &amp; analysis
          </h2>
          <Link
            href="/guides"
            className="text-[0.26rem] md:text-base underline underline-offset-4 text-black/60 transition-colors hover:text-black"
          >
            All guides
          </Link>
        </div>

        <div className="mt-[0.5rem] md:mt-[0.34rem] grid gap-[0.6rem] md:gap-[0.34rem] sm:grid-cols-2 md:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <div className="mt-[0.8rem] md:mt-[0.5rem] max-w-[8.4rem]">
        <AffiliationNotice />
      </div>
    </PageShell>
  );
}

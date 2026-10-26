import type { Metadata } from "next";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { NewsHub, type HubItem } from "@/components/editorial/NewsHub";
import { PageShell } from "@/components/PageShell";
import { articles } from "@/data/articles";
import { launchWatch } from "@/data/launch-watch";
import { formatNewsDate } from "@/lib/news";
import { getNewsHub } from "@/lib/news-hub";

/**
 * Refresh window in seconds. Every six hours the page re-pulls all publisher
 * feeds on its own: no rebuild, no manual step. The weekly archive job
 * (.github/workflows/weekly-news.yml) keeps older tracked-car stories around.
 */
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Car News & EV Guides — JSW Combat, Jaecoo J5, iCAR V23 Launch Updates",
  description:
    "Live Indian car news from Autocar India, CarWale, CarDekho, Rushlane, carandbike and more, with every JSW Combat (Jetour T2), Jaecoo J5 and iCAR V23 launch story in one place, plus our long-form EV and hybrid guides. Updated automatically.",
  alternates: { canonical: "/guides" },
};

const DATE_FORMAT = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

export default async function GuidesPage() {
  const hub = await getNewsHub(revalidate);

  // Dates are formatted here, on the server, so the client never re-formats them.
  const items: HubItem[] = hub.items.map((item) => ({
    ...item,
    dateLabel: item.published ? DATE_FORMAT.format(new Date(item.published)) : "",
  }));

  const statusLine = `${hub.items.length} stories · ${hub.sourcesLive}/${hub.sourcesTotal} sources live · updated ${formatNewsDate(hub.fetchedAt)} IST`;

  return (
    <PageShell
      title="News & EV guides"
      intro="Every launch story on the JSW Combat, Jaecoo J5 and iCAR V23 from across the Indian motoring press, plus the day's car news and our own long-form guides. Updates itself around the clock."
    >
      <NewsHub
        items={items}
        sources={hub.sources}
        counts={hub.counts}
        launchWatch={launchWatch}
        statusLine={statusLine}
      />

      <p className="mt-[0.4rem] md:mt-[0.26rem] max-w-[8.4rem] text-[0.22rem] md:text-sm leading-relaxed text-black/45">
        Headlines are collected from public feeds published by {hub.sources.join(", ")}. We show
        the headline, a short extract and a link to the original. Full articles stay with their
        publishers, and all rights remain theirs. Inclusion is not endorsement or verification.
        Live headlines refresh every few hours, and stories about the three tracked cars are
        archived weekly so they stay here after they leave a publisher&apos;s feed.
      </p>

      {/* Our own long-form work. */}
      <section
        aria-labelledby="our-guides"
        className="mt-[1rem] md:mt-[0.7rem] border-t border-black/10 pt-[0.6rem] md:pt-[0.4rem]"
      >
        <h2 id="our-guides" className="font-display text-[0.5rem] md:text-[0.32rem] leading-none font-medium">
          Our guides &amp; analysis
        </h2>
        <p className="mt-[0.2rem] md:mt-[0.12rem] max-w-[7rem] text-[0.26rem] md:text-[0.15rem] leading-relaxed text-black/55">
          Long-form pieces on what actually decides an electric or hybrid purchase in India:
          running cost, charging access, battery care, policy and head-to-head comparisons.
        </p>
        <div className="mt-[0.5rem] md:mt-[0.34rem] grid gap-[0.7rem] md:gap-[0.4rem] sm:grid-cols-2 md:grid-cols-3">
          {articles.map((article) => (
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

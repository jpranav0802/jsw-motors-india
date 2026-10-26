import archive from "@/data/press-archive.json";
import { dedupeKey, getNews, type ModelTag, type NewsItem } from "@/lib/news";

/**
 * Everything the News & Guides hub shows, in one call:
 *
 * - live stories from every feed in `news.ts` (refreshed on the page's ISR
 *   window, so new headlines appear within hours with no deploy), and
 * - the press archive (`src/data/press-archive.json`), which keeps stories
 *   about the three tracked cars after they scroll out of a publisher's feed.
 *   A GitHub Action (`.github/workflows/weekly-news.yml`) adds the week's
 *   tracked stories to it every Monday and commits, which also redeploys.
 */

export interface HubResult {
  items: NewsItem[];
  sources: string[];
  counts: Record<ModelTag | "all", number>;
  sourcesLive: number;
  sourcesTotal: number;
  fetchedAt: string;
  archiveUpdatedAt: string;
}

const archived = archive.items as NewsItem[];

/** This is a car site: motorcycle and scooter stories are left out of the hub. */
const TWO_WHEELER_RE =
  /\b(?:motorcycles?|motorbikes?|bikes?|scooters?|two-wheelers?|2-wheelers?|royal enfield|ktm|kawasaki|harley|yamaha|hero motocorp|honda motorcycle|triumph|ducati|aprilia|ather|ola electric|husqvarna|jawa|yezdi)\b/i;

function time(item: NewsItem): number {
  return item.published ? Date.parse(item.published) : 0;
}

export async function getNewsHub(revalidate: number): Promise<HubResult> {
  const live = await getNews(revalidate, 240, { includeGeneral: true, sort: "recent" });

  // Archive first so its hand-checked copy wins over a live duplicate.
  const seenLinks = new Set<string>();
  const seenTitles = new Set<string>();
  const items: NewsItem[] = [];
  const liveCars = live.items.filter((item) => !TWO_WHEELER_RE.test(`${item.title} ${item.snippet}`));
  for (const item of [...archived, ...liveCars]) {
    const key = dedupeKey(item);
    if (seenLinks.has(item.link) || seenTitles.has(key)) continue;
    seenLinks.add(item.link);
    seenTitles.add(key);
    items.push(item);
  }

  // Newest first; undated archive entries sink to the end of their group.
  items.sort((a, b) => time(b) - time(a));

  const counts: HubResult["counts"] = { all: items.length, combat: 0, j5: 0, v23: 0, jsw: 0 };
  for (const item of items) for (const tag of item.models) counts[tag] += 1;

  const sources = [...new Set(items.map((item) => item.source))].sort((a, b) => a.localeCompare(b));

  return {
    items,
    sources,
    counts,
    sourcesLive: live.sourcesLive,
    sourcesTotal: live.sourcesTotal,
    fetchedAt: live.fetchedAt,
    archiveUpdatedAt: archive.updatedAt,
  };
}

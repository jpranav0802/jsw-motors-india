/**
 * Daily automotive news aggregation.
 *
 * Pulls RSS from a fixed list of Indian automotive publishers, filters and
 * ranks the items so JSW / Jetour / Jaecoo / iCAR stories surface first, and
 * hands the page a deduplicated list. The page that renders this sets an ISR
 * `revalidate`, so the feed refreshes on its own without a rebuild.
 *
 * We store and display only what RSS is published for: headline, a short
 * snippet, the publisher's name and the outbound link. Full article text is
 * never reproduced, and every item links back to the source.
 *
 * Deliberately dependency-free: RSS 2.0 (and Google-News-style sitemaps, which
 * is all CarDekho publishes) are regular enough to parse with a few anchored
 * regexes, and an XML parser for a dozen feeds is not worth it.
 *
 * Also imported by `scripts/update-press-archive.ts` (run weekly by GitHub
 * Actions), so keep this file free of `@/` imports and Next-only APIs.
 *
 * NOTE: Google News RSS is intentionally NOT used here. Its own copyright
 * notice limits the feed to "personal, non-commercial use" in a feed reader,
 * which an ad-supported website is not.
 */

/** The cars this site tracks, plus "jsw" for JSW Motors brand stories. */
export type ModelTag = "combat" | "j5" | "v23" | "jsw";

export interface NewsItem {
  title: string;
  link: string;
  /** Plain-text snippet, trimmed to a couple of lines. */
  snippet: string;
  /** Publisher name, taken from our feed config rather than the feed body. */
  source: string;
  /** ISO timestamp, or null when the feed omits a usable date. */
  published: string | null;
  /** 2 = names one of our tracked brands, 1 = EV/launch relevant, 0 = general. */
  relevance: 0 | 1 | 2;
  /** Which tracked cars the story is about. Empty for general news. */
  models: ModelTag[];
}

interface Feed {
  url: string;
  source: string;
  /** "rss" (default) or a Google-News-style sitemap: headline, link and date only. */
  format?: "rss" | "news-sitemap";
}

/**
 * Verified working as of October 2026. A dead feed is skipped, not fatal.
 * Team-BHP, MotorOctane and CarToq block automated feed readers, so they are
 * not here; ZigWheels publishes no feed.
 */
export const FEEDS: Feed[] = [
  { url: "https://www.autocarindia.com/rss/news", source: "Autocar India" },
  { url: "https://www.autocarindia.com/rss/car-reviews", source: "Autocar India" },
  { url: "https://www.carwale.com/rss/", source: "CarWale" },
  { url: "https://www.cardekho.com/google-car-news-sitemap.xml", source: "CarDekho", format: "news-sitemap" },
  { url: "https://www.carandbike.com/rss/newsrss", source: "carandbike" },
  { url: "https://www.autox.com/feed/", source: "autoX" },
  { url: "https://www.autocarpro.in/rssfeeds/category-passenger-vehicles", source: "Autocar Professional" },
  { url: "https://auto.economictimes.indiatimes.com/rss/passenger-vehicle", source: "ETAuto" },
  { url: "https://auto.economictimes.indiatimes.com/rss/industry", source: "ETAuto" },
  { url: "https://www.rushlane.com/feed", source: "Rushlane" },
  { url: "https://gaadiwaadi.com/feed", source: "GaadiWaadi" },
  { url: "https://www.motorbeam.com/feed/", source: "MotorBeam" },
  { url: "https://www.autopunditz.com/blog-feed.xml", source: "AutoPunditz" },
];

/** Brands this site tracks — a hit here pins the story to the top of the page. */
const TRACKED = [
  "jetour",
  "jaecoo",
  "jsw",
  "icar",
  "\\bv23\\b",
  "\\bt2\\b",
  "combat suv",
  "chery",
  "mg motor",
  "\\bmg\\b\\s+(?:windsor|astor|hector|comet|zs)",
];

/** Second tier — kept, but ranked below anything naming a tracked brand. */
const RELEVANT = [
  "electric",
  "\\bev\\b",
  "hybrid",
  "phev",
  "battery",
  "charging",
  "new energy",
  "launch",
  "unveil",
  "spied",
  "spy shot",
  "teaser",
  "price announced",
  "bookings open",
];

const TRACKED_RE = new RegExp(TRACKED.join("|"), "i");

/** Per-car patterns. A story can match more than one. */
const MODEL_PATTERNS: Record<Exclude<ModelTag, "jsw">, RegExp> = {
  combat: /\bjsw combat\b|\bcombat\b[^.]{0,40}\b(?:suv|phev|plug-in|hybrid)\b|\bjetour\b|\bt2\b/i,
  j5: /\bjaecoo\b|\bj5\b/i,
  v23: /\bicar\b|\bv23\b/i,
};
const JSW_MOTORS_RE = /\bjsw motors?\b/i;

/** Tags a headline + snippet with the tracked cars it is about. */
export function classifyModels(text: string): ModelTag[] {
  const tags = (Object.keys(MODEL_PATTERNS) as Exclude<ModelTag, "jsw">[]).filter((key) =>
    MODEL_PATTERNS[key].test(text),
  ) as ModelTag[];
  if (tags.length > 0 || JSW_MOTORS_RE.test(text)) tags.push("jsw");
  return tags;
}

/** Drops tracking parameters (CarWale's feed appends a sponsorship UTM set). */
function cleanLink(link: string): string {
  try {
    const url = new URL(link);
    for (const key of [...url.searchParams.keys()]) {
      if (key.startsWith("utm_")) url.searchParams.delete(key);
    }
    return url.toString();
  } catch {
    return link;
  }
}
const RELEVANT_RE = new RegExp(RELEVANT.join("|"), "i");

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  ndash: "–",
  mdash: "—",
  hellip: "…",
};

function decodeOnce(input: string): string {
  return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      return String.fromCodePoint(parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(parseInt(entity.slice(1), 10));
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

/**
 * Several publishers double-encode — `&amp;amp;D` for `&D` — so one pass leaves
 * a stray `&amp;` that React then escapes again and the reader sees raw. Decode
 * until the string stops changing, capped so a pathological input can't spin.
 */
function decodeEntities(input: string): string {
  let current = input;
  for (let pass = 0; pass < 3; pass += 1) {
    const next = decodeOnce(current);
    if (next === current) break;
    current = next;
  }
  return current;
}

/** Unwraps CDATA, strips markup, collapses whitespace. */
function clean(raw: string | undefined): string {
  if (!raw) return "";
  const withoutCdata = raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  const withoutTags = withoutCdata.replace(/<[^>]*>/g, " ");
  return decodeEntities(withoutTags).replace(/\s+/g, " ").trim();
}

function tag(item: string, name: string): string | undefined {
  const match = item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, "i"));
  return match?.[1];
}

/**
 * Strips the syndication boilerplate WordPress feeds append to every excerpt —
 * the trailing "The post <title> appeared first on <site>" and the leading
 * "<Publisher> - " stamp some feeds prefix. Left in, they eat most of the
 * snippet and read like broken text.
 */
function stripBoilerplate(text: string, source: string): string {
  return text
    .replace(new RegExp(`^${source}\\s*[-–—:]\\s*`, "i"), "")
    .replace(/\s*The post\b[\s\S]*$/i, "")
    .replace(/\s*(?:appeared|first appeared)\s+first\s+on\b[\s\S]*$/i, "")
    .replace(/\s*Continue reading\b[\s\S]*$/i, "")
    .replace(/\s*\[…\]\s*$/, "")
    .trim();
}

function truncate(text: string, max = 190): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

function parseFeed(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];

  for (const match of xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)) {
    const block = match[1];

    const title = clean(tag(block, "title"));
    const link = cleanLink(clean(tag(block, "link")));
    if (!title || !link.startsWith("http")) continue;

    const snippet = truncate(stripBoilerplate(clean(tag(block, "description")), source));
    const haystack = `${title} ${snippet}`;

    const relevance: NewsItem["relevance"] = TRACKED_RE.test(haystack)
      ? 2
      : RELEVANT_RE.test(haystack)
        ? 1
        : 0;

    const rawDate = clean(tag(block, "pubDate")) || clean(tag(block, "dc:date"));
    const parsed = rawDate ? new Date(rawDate) : null;
    const published =
      parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : null;

    items.push({ title, link, snippet, source, published, relevance, models: classifyModels(haystack) });
  }

  return items;
}

/** Google-News-style sitemap: `<url><loc>` plus `<news:title>` and a date. No snippet. */
function parseNewsSitemap(xml: string, source: string): NewsItem[] {
  const items: NewsItem[] = [];

  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
    const block = match[1];
    const title = clean(tag(block, "news:title"));
    const link = cleanLink(clean(tag(block, "loc")));
    if (!title || !link.startsWith("http")) continue;

    const rawDate = clean(tag(block, "news:publication_date"));
    const parsed = rawDate ? new Date(rawDate) : null;
    const published =
      parsed && !Number.isNaN(parsed.getTime()) ? parsed.toISOString() : null;

    const relevance: NewsItem["relevance"] = TRACKED_RE.test(title)
      ? 2
      : RELEVANT_RE.test(title)
        ? 1
        : 0;

    items.push({ title, link, snippet: "", source, published, relevance, models: classifyModels(title) });
  }

  return items;
}

export async function fetchFeed(feed: Feed, revalidate: number): Promise<NewsItem[]> {
  try {
    const res = await fetch(feed.url, {
      headers: {
        // Some publishers reject an unidentified client outright.
        "User-Agent": "Mozilla/5.0 (compatible; JSWMotorsIndiaBot/1.0; +https://jswmotorsindia.com)",
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      // Cached by Next's data cache and refreshed on the page's ISR schedule.
      next: { revalidate, tags: ["news"] },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const body = await res.text();
    return feed.format === "news-sitemap"
      ? parseNewsSitemap(body, feed.source)
      : parseFeed(body, feed.source);
  } catch {
    // A single publisher being down, slow or rate-limiting must never break the
    // page or the build — we just render fewer stories.
    return [];
  }
}

/** Normalised key for dedupe: the same story often runs at several outlets. */
export function dedupeKey(item: Pick<NewsItem, "title">): string {
  return item.title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(/\s+/)
    .slice(0, 8)
    .join(" ");
}

export interface NewsFeedResult {
  items: NewsItem[];
  /** How many of the configured feeds answered. 0 means we are showing nothing. */
  sourcesLive: number;
  sourcesTotal: number;
  fetchedAt: string;
}

export interface GetNewsOptions {
  /** Keep general motoring stories (relevance 0) instead of dropping them. */
  includeGeneral?: boolean;
  /** "relevance": tracked brands first, then recency. "recent": newest first. */
  sort?: "relevance" | "recent";
}

/**
 * Fetches every configured feed in parallel and returns a ranked, deduplicated
 * list. Tracked-brand stories first, then the rest by recency.
 *
 * @param revalidate seconds Next should cache each feed response for.
 * @param limit maximum stories to return.
 */
export async function getNews(
  revalidate = 21600,
  limit = 24,
  { includeGeneral = false, sort = "relevance" }: GetNewsOptions = {},
): Promise<NewsFeedResult> {
  const settled = await Promise.allSettled(FEEDS.map((feed) => fetchFeed(feed, revalidate)));

  const all: NewsItem[] = [];
  let sourcesLive = 0;
  for (const result of settled) {
    if (result.status === "fulfilled" && result.value.length > 0) {
      sourcesLive += 1;
      all.push(...result.value);
    }
  }

  const seen = new Set<string>();
  const unique = all.filter((item) => {
    const key = dedupeKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const ranked = unique
    // Drop general-interest industry items — this is a car-buying site, not a
    // business wire. Tier 1 and 2 both stay.
    .filter((item) => includeGeneral || item.relevance > 0)
    .sort((a, b) => {
      if (sort === "relevance" && a.relevance !== b.relevance) return b.relevance - a.relevance;
      const at = a.published ? Date.parse(a.published) : 0;
      const bt = b.published ? Date.parse(b.published) : 0;
      return bt - at;
    })
    .slice(0, limit);

  return {
    items: ranked,
    sourcesLive,
    sourcesTotal: FEEDS.length,
    fetchedAt: new Date().toISOString(),
  };
}

/** "20 Aug 2026, 14:05" — one formatter so cards and headers agree. */
export function formatNewsDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

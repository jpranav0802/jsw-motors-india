/**
 * Adds this week's stories about the tracked cars (JSW Combat, Jaecoo J5, iCAR
 * V23, JSW Motors) to src/data/press-archive.json.
 *
 * Publisher feeds only hold their last 10–100 items, so without this a story
 * about the Combat vanishes from the News & Guides page a few days after it
 * runs. Run weekly by .github/workflows/weekly-news.yml, which commits the
 * file; the commit redeploys the site. Safe to run by hand too:
 *
 *   node scripts/update-press-archive.ts
 *
 * Only what the feeds publish is kept: headline, short snippet, source, date
 * and the outbound link. Never article bodies.
 */

import { readFileSync, writeFileSync } from "node:fs";

import { FEEDS, dedupeKey, fetchFeed, type NewsItem } from "../src/lib/news.ts";

const ARCHIVE = new URL("../src/data/press-archive.json", import.meta.url);
/** Plenty for readers, small enough to keep the page and the repo light. */
const MAX_ITEMS = 400;

interface Archive {
  updatedAt: string;
  items: NewsItem[];
}

const archive = JSON.parse(readFileSync(ARCHIVE, "utf8")) as Archive;

const results = await Promise.all(FEEDS.map((feed) => fetchFeed(feed, 0)));
const fresh = results.flat().filter((item) => item.models.length > 0);

const links = new Set(archive.items.map((item) => item.link));
const titles = new Set(archive.items.map((item) => dedupeKey(item)));

let added = 0;
for (const item of fresh) {
  const key = dedupeKey(item);
  if (links.has(item.link) || titles.has(key)) continue;
  links.add(item.link);
  titles.add(key);
  archive.items.push(item);
  added += 1;
}

const time = (item: NewsItem) => (item.published ? Date.parse(item.published) : 0);
archive.items.sort((a, b) => time(b) - time(a));
archive.items = archive.items.slice(0, MAX_ITEMS);

const feedsAnswered = results.filter((items) => items.length > 0).length;
console.log(`${feedsAnswered}/${FEEDS.length} feeds answered, ${fresh.length} tracked stories seen, ${added} new.`);

if (added > 0) {
  archive.updatedAt = new Date().toISOString();
  writeFileSync(ARCHIVE, `${JSON.stringify(archive, null, 2)}\n`);
  console.log(`Archive now holds ${archive.items.length} stories.`);
} else {
  console.log("Nothing new; archive left unchanged.");
}

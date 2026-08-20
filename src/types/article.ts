/**
 * Editorial article model.
 *
 * Articles are authored as plain data (not MDX) so the whole guides section
 * stays type-checked and renders through one component — `ArticleBody` — which
 * keeps typography identical across every post.
 */

/** A comparison / data table inside an article body. */
export interface ArticleTable {
  caption?: string;
  head: string[];
  rows: string[][];
}

/** One headed chunk of an article. Every field except `heading` is optional. */
export interface ArticleBlock {
  heading?: string;
  /** One entry per paragraph. */
  paragraphs?: string[];
  /** Rendered as a bulleted list under the paragraphs. */
  bullets?: string[];
  table?: ArticleTable;
  /** Pulled out into a bordered aside — used for takeaways and caveats. */
  callout?: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Meta description and the card snippet on the index. */
  description: string;
  /** Short label shown on cards, e.g. "Buying guide". */
  category: string;
  /** ISO date, e.g. "2026-06-14". */
  published: string;
  /** ISO date of the last substantive revision. */
  updated?: string;
  /** Rounded reading time in minutes. */
  readingMinutes: number;
  /** Card artwork, served from /public. */
  image: string;
  /** Alt text for `image`. */
  imageAlt: string;
  /** Opening standfirst, rendered above the body. */
  standfirst: string;
  blocks: ArticleBlock[];
}

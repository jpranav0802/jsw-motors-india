/**
 * Editorial identity for the site — the named author behind the guides, the
 * monitored contact address, and the affiliation disclaimer. Kept in one place
 * because the same strings appear in article bylines, JSON-LD, the About page,
 * the footer and the dedicated disclaimer page, and they must not drift apart.
 */

export const editor = {
  name: "Pranav Jain",
  role: "Founder & Editor",
  location: "Delhi, India",
  /** Shown on the About page and under every article. */
  bio:
    "Pranav has followed India's shift to new-energy vehicles since the first wave of " +
    "electric hatchbacks arrived in Delhi showrooms, and started this site because the " +
    "coverage of upcoming JSW MG and NEV-platform models was either a press release or a " +
    "rumour. He writes the platform breakdowns, the cost-per-kilometre maths and the " +
    "charging guides here, and spends more time than is reasonable reading state EV " +
    "policy notifications.",
  /** One-line interest area for the author card. */
  focus: "EV and hybrid powertrains, charging infrastructure, and the economics of ownership in India",
} as const;

/** Monitored inbox. Every contact route on the site points here. */
export const contactEmail = "jpranav08@gmail.com";

/**
 * Affiliation disclaimer. Rendered on the home page, the footer, the About
 * page and the dedicated /disclaimer route — verbatim, in every location.
 */
export const affiliationDisclaimer =
  "JSW Motors India / jswmotorsindia.com is an independent automotive news and enthusiast " +
  "community portal and is not officially affiliated with JSW Group or JSW MG Motor India.";

/** Short form for tight spaces, e.g. the header strip. */
export const affiliationDisclaimerShort =
  "Independent enthusiast portal — not affiliated with JSW Group or JSW MG Motor India.";

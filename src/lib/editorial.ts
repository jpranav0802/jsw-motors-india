/**
 * Site identity and disclosure strings.
 *
 * IMPORTANT — read before changing anything here.
 *
 * This site is an independent, unofficial enthusiast and news portal. It has no
 * connection to JSW Group, JSW MG Motor India, MG Motor, Chery, Jetour or
 * Jaecoo. Nothing in this file (or anywhere on the site) may present the site as
 * an official, affiliated or authorised property of any of those companies, or
 * use their names as the site's own name or branding.
 *
 * Manufacturer and model names may appear only as the *subject* of coverage
 * ("the Jetour T2 has 220 mm of clearance"), never as the publisher's identity.
 */

/**
 * The site's own name. Deliberately neutral — it must not contain a
 * manufacturer's name. Change this string to rename the site everywhere.
 */
export const siteName = "NEV India";

/** Longer form used in metadata descriptions and legal copy. */
export const siteTagline = "Independent EV & hybrid coverage for India";

/**
 * The domain, used to identify the site in legal text. This is a factual
 * reference to the address, not a claim of identity or affiliation.
 */
export const siteDomain = "jswmotorsindia.com";

/**
 * Public contact address. Intentionally empty: no personal address is published
 * on this site. Set this to a role address on the site's own domain (e.g.
 * "contact@example.com") once one exists, and every contact surface will start
 * showing it automatically. Leave empty rather than publishing a personal inbox.
 */
export const contactEmail: string | null = null;

/**
 * Byline used on editorial content. A role name, not a person — no individual's
 * name, location or contact details are published on this site.
 */
export const editorialByline = `${siteName} editorial`;

/**
 * Affiliation disclaimer. Rendered verbatim on the home page, in the footer, on
 * the About page and on the dedicated /disclaimer route.
 *
 * This is the site's primary legal protection. Do not soften it, and do not let
 * it read as though a manufacturer's name is the name of this publication.
 */
export const affiliationDisclaimer =
  `This website (${siteDomain}) is an independent, unofficial news and enthusiast ` +
  "portal. It is not affiliated with, authorised by, endorsed by, sponsored by or " +
  "connected in any way to JSW Group, JSW MG Motor India, MG Motor, Chery, Jetour, " +
  "Jaecoo or any of their subsidiaries. All company names, model names, trademarks " +
  "and logos are the property of their respective owners and are used here for " +
  "identification and descriptive purposes only.";

/** Short form for tight spaces, e.g. the header strip. */
export const affiliationDisclaimerShort =
  "Independent, unofficial portal — not affiliated with JSW, MG, Chery, Jetour or Jaecoo.";

/**
 * How readers are told to reach us in legal copy. Resolves to a mailto
 * instruction once `contactEmail` is set; until then it points at the on-site
 * form so no personal inbox is ever published.
 */
export const contactInstruction = contactEmail
  ? `write to ${contactEmail}`
  : "use the form on the Register your interest page, which reaches this site's inbox";

/** Same idea, capitalised for use at the start of a sentence. */
export const ContactInstruction =
  contactInstruction.charAt(0).toUpperCase() + contactInstruction.slice(1);

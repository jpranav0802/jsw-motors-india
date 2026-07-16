import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Cookies Notice | JSW Auto",
  description:
    "How JSW Auto uses cookies to keep the site working and understand how it is used — and how to turn the optional ones off.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What are cookies?",
    body: [
      "Cookies are small text files placed on your device when you visit a website. Your browser sends them back each time you return, which lets the site remember your device and preferences and improve your experience.",
      "We want your visit to be smooth, reliable and as useful to you as possible, and cookies help us do that.",
    ],
  },
  {
    heading: "What types of cookies do we use?",
    body: [
      "Strictly necessary cookies keep the site working — they remember your language and your place in a booking. The site cannot function properly without them, so they cannot be switched off.",
      "Analytics cookies tell us which pages people actually use, so we can improve them. These are optional, and this site sets none until you accept them.",
    ],
  },
  {
    heading: "Managing cookies",
    body: [
      "You can accept or decline optional cookies when you first visit, and change your mind at any time. Declining optional cookies will not stop you booking a test drive or contacting us.",
      "You can also clear cookies at any time in your browser settings. Doing so will reset your preferences here.",
    ],
  },
  {
    heading: "Changes to this notice",
    body: [
      "We may update this notice as the site changes or as the law requires. The date above shows when it was last updated.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookies Notice"
      intro="How this site uses cookies, and what you can turn off."
    >
      <LegalDoc updated="16 July 2026" sections={SECTIONS} />
    </PageShell>
  );
}

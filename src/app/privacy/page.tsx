import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | JSW Auto",
  description: "How JSW Auto collects, uses, shares and protects your personal data.",
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What we collect",
    body: [
      "When you book a test drive or send us a message, we collect the details you give us — your name, contact details, city and country, the model you are interested in, and anything you write in a message.",
      "We also collect basic, non-identifying information about how the site is used, but only after you accept analytics cookies. You can read more on our Cookies page.",
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      "We use your details only to do what you asked: to arrange a booking, to answer an enquiry, and to contact you about it. We do not use them for anything else without telling you first.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "We do not sell your data. We share it only with the dealer handling your booking or enquiry, and only what they need to reach you.",
      "Where analytics are enabled, aggregated usage data is processed by our analytics provider on our behalf; it does not identify you personally.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep enquiry and booking details only for as long as we need them to help you, and to meet any legal obligations, after which we delete them.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us to show you the data we hold about you, to correct it, or to delete it. You can also withdraw consent for analytics at any time.",
      "To make any of these requests, write to us using the details on the Contact page. We will respond within the timeframe your local law requires.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "Global website information is subject to regional variations. We may update this policy from time to time; the date above shows when it last changed.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      intro="What we collect, why, who we share it with, and how long we keep it."
    >
      <LegalDoc updated="16 July 2026" sections={SECTIONS} />
    </PageShell>
  );
}

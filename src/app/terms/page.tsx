import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import { PageShell } from "@/components/PageShell";
import { affiliationDisclaimer, contactEmail } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms on which jswmotorsindia.com is made available — permitted use, intellectual property, user submissions, advertising, liability and governing law.",
  alternates: { canonical: "/terms" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance",
    body: [
      "By using jswmotorsindia.com you accept these terms. If you do not accept them, please do not use the site.",
      affiliationDisclaimer,
    ],
  },
  {
    heading: "What the site provides",
    body: [
      "This site publishes editorial articles, specifications, comparisons and ownership guides about new-energy vehicles in India, together with a free interest registry and an email contact address.",
      "It does not sell vehicles, take bookings, process payments or act as an agent for any manufacturer or dealer. Nothing on the site constitutes an offer capable of acceptance.",
    ],
  },
  {
    heading: "Permitted use",
    body: [
      "You may read, print and share the content here for your own personal, non-commercial use, and you may quote short extracts with clear attribution and a link to the original page.",
      "You may not republish articles in whole or in substantial part, scrape the site at scale, use it to train models without permission, misrepresent our content as your own, or use it in any way that is unlawful or that interferes with the site's operation or other readers' use of it.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Editorial text, analysis, comparison tables and original layout on this site are our copyright unless stated otherwise.",
      "Vehicle images, technical drawings, brand names, model names and logos remain the property of their respective owners and are used here for identification and descriptive purposes only. If you own material used here and want it removed or credited differently, write to us and we will act promptly.",
    ],
  },
  {
    heading: "Your submissions",
    body: [
      "When you send us a message, a correction or a tip-off, you confirm the information is yours to send and does not breach anyone else's rights or any confidentiality obligation you are under.",
      "You allow us to use what you send to correct and improve our coverage, including publishing a correction that results from it. We will not publish your personal details without asking you first.",
      "Do not send confidential, embargoed or unlawfully obtained material.",
    ],
  },
  {
    heading: "Mailing list",
    body: [
      "The launch-alert list is free and optional. You can unsubscribe at any time using the link in every email, and unsubscribing removes your details from the list.",
      "We may stop, change or pause the mailing list at any time. It creates no entitlement to any vehicle, allocation, price or delivery date.",
    ],
  },
  {
    heading: "Advertising",
    body: [
      "The site carries advertising served by third-party networks, including Google. We do not control which advertisements appear, and their presence is not an endorsement.",
      "Dealings with advertisers are between you and them. We are not party to those transactions and accept no responsibility for them.",
    ],
  },
  {
    heading: "Accuracy and no warranty",
    body: [
      "Content is provided on an “as is” and “as available” basis without warranties of any kind, express or implied. Much of what is published concerns unlaunched vehicles, where specifications and prices are not final.",
      "We do not warrant that the site will be uninterrupted, error-free or free of harmful components, and we may change, suspend or withdraw any part of it at any time.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we are not liable for any indirect or consequential loss, or for any loss of profit, revenue, data or opportunity, arising from your use of this site or reliance on its content.",
      "Nothing in these terms limits liability that cannot lawfully be limited.",
    ],
  },
  {
    heading: "Changes to these terms",
    body: [
      "We may update these terms as the site changes or as the law requires. The date above shows when they last changed, and continued use after a change means you accept the updated terms.",
    ],
  },
  {
    heading: "Governing law and contact",
    body: [
      "These terms are governed by the laws of India, and the courts at Delhi have exclusive jurisdiction over any dispute arising from them.",
      `Questions about these terms go to ${contactEmail}.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      intro="The terms on which this site is made available, and what you may and may not do with what is published here."
    >
      <LegalDoc updated="18 August 2026" sections={SECTIONS} />
    </PageShell>
  );
}

import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import { PageShell } from "@/components/PageShell";
import { affiliationDisclaimer, contactEmail } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What jswmotorsindia.com collects, why, who we share it with, how long we keep it, and how third-party advertising vendors including Google use cookies on this site.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      affiliationDisclaimer,
      `This policy covers the website at jswmotorsindia.com. Questions about it, and any request relating to your data, go to ${contactEmail}.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "When you register your interest, we collect the details you give us — your name, email address, phone number, city and the model you are interested in. If you email us instead, we hold that correspondence in the ordinary way any inbox does.",
      "We also collect basic, non-identifying information about how the site is used, such as which pages are visited and roughly where visitors are in the world. Analytics of this kind are set only after you accept analytics cookies.",
      "Our advertising partners collect information about your visit through their own cookies and similar technologies. That collection is described in the advertising section below and is governed by their own policies.",
    ],
  },
  {
    heading: "Why we collect it",
    body: [
      "We use the details you give us only to do what you asked: to send you the launch alerts and guides you signed up for, or to reply to your message. We do not use them for anything else without telling you first.",
      "We use aggregated usage data to understand which articles are useful and where the site is confusing, so we can improve it.",
    ],
  },
  {
    heading: "Third-party vendors and advertising cookies",
    body: [
      "Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.",
      "Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet. This includes the DART cookie, which Google and its partners use to serve ads to users based on their prior visits to this and other websites.",
      "Users may opt out of personalised advertising by visiting Google's Ads Settings at www.google.com/settings/ads. Users may also opt out of a third-party vendor's use of cookies for personalised advertising by visiting www.aboutads.info/choices, or www.youronlinechoices.com for EU-based options.",
      "Where required, we ask for your consent before non-essential advertising and analytics cookies are set, and you can withdraw that consent at any time. Full detail of the categories used is in our cookie policy.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "We do not sell your data. We do not pass your details to car manufacturers, dealers or anyone else for marketing purposes.",
      "We use service providers to run the site — a hosting provider, a database provider that stores form submissions, an analytics provider and an advertising provider. Each processes data only as needed to provide its service, and each is bound by its own privacy terms.",
      "We may disclose information where the law requires it, or to protect our rights or the safety of others.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Interest-registry details are kept until you ask us to delete them. Email correspondence is kept for as long as needed to deal with the matter and to keep a record of any correction we published, after which it is deleted.",
      "Aggregated analytics data is retained according to our analytics provider's standard retention settings and does not identify you personally.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us to show you the data we hold about you, to correct it, or to delete it. You can withdraw consent for analytics and advertising cookies at any time, and you can unsubscribe from every email we send using the link it carries.",
      `To make any of these requests, write to ${contactEmail}. We respond within the timeframe applicable law requires, and we will not make you justify the request.`,
    ],
  },
  {
    heading: "Children",
    body: [
      "This site is not directed at children, and we do not knowingly collect personal information from anyone under 18. If you believe a child has given us their details, write to us and we will delete them.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as the site changes or as the law requires. The date above shows when it last changed; material changes will be noted on the page rather than made silently.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      intro="What we collect, why, who we share it with, how long we keep it, and how advertising cookies work on this site."
    >
      <LegalDoc updated="18 August 2026" sections={SECTIONS} />
    </PageShell>
  );
}

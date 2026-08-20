import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import { PageShell } from "@/components/PageShell";
import { contactEmail } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How jswmotorsindia.com uses cookies — strictly necessary, analytics and third-party advertising cookies including Google's DART cookie — and how to turn the optional ones off.",
  alternates: { canonical: "/cookies" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "What are cookies?",
    body: [
      "Cookies are small text files placed on your device when you visit a website. Your browser sends them back each time you return, which lets a site remember your device and your preferences.",
      "Similar technologies — local storage, pixels and device identifiers — do broadly the same job. Where this policy says “cookies”, it covers those too.",
    ],
  },
  {
    heading: "Strictly necessary cookies",
    body: [
      "These keep the site working: they remember your cookie choices and keep form submissions functioning. The site cannot work properly without them, so they cannot be switched off.",
      "They set no advertising identifier and are not used to profile you.",
    ],
  },
  {
    heading: "Analytics cookies",
    body: [
      "Analytics tell us which pages are actually read and where people leave, so we can improve them. This is optional, and nothing is set until you accept it.",
      "Declining analytics does not stop you reading anything or registering your interest.",
    ],
  },
  {
    heading: "Advertising cookies, including Google's DART cookie",
    body: [
      "This site is supported by advertising. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites.",
      "Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet. This includes the DART cookie, which Google and its partners use to serve ads based on prior visits to this and other websites.",
      "Users may opt out of personalised advertising by visiting Google's Ads Settings at www.google.com/settings/ads. You can opt out of other third-party vendors' use of cookies for personalised advertising at www.aboutads.info/choices, or at www.youronlinechoices.com in the EU.",
      "Opting out of personalised advertising does not remove advertising from the site; it means the ads you see are less relevant to you.",
    ],
  },
  {
    heading: "Managing cookies",
    body: [
      "You can accept or decline optional cookies when you first visit and change your mind at any time. You can also clear or block cookies in your browser settings — doing so resets your preferences here, and blocking all cookies may stop parts of the site working.",
      `If you want to know exactly what is set on a given page, browser developer tools will show you, and you are welcome to write to ${contactEmail} if something does not match this policy.`,
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "We may update this policy as the site changes or as the law requires. The date above shows when it was last updated.",
    ],
  },
];

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      intro="What this site sets, what it is for, and how to turn off the optional categories."
    >
      <LegalDoc updated="18 August 2026" sections={SECTIONS} />
    </PageShell>
  );
}

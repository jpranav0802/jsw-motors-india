import type { Metadata } from "next";

import { LegalDoc, type LegalSection } from "@/components/LegalDoc";
import { PageShell } from "@/components/PageShell";
import { affiliationDisclaimer, contactInstruction } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Disclaimer & Affiliation Notice",
  description:
    "This site is an independent, unofficial news and enthusiast portal. It is not affiliated with, authorised by or endorsed by JSW Group, JSW MG Motor India, MG, Chery, Jetour or Jaecoo. Full disclaimer and affiliation notice.",
  alternates: { canonical: "/disclaimer" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: "Affiliation",
    body: [
      affiliationDisclaimer,
      "We are not a manufacturer, a dealer, a distributor or an agent for any of them. We have no commercial relationship with JSW Group, JSW MG Motor India, MG Motor, Chery, Jetour, Jaecoo or any of their subsidiaries, and none of them reviews, approves or funds what is published here.",
      "All product names, model names, brand names, logos and trademarks referenced on this site are the property of their respective owners. They are used here for identification and descriptive purposes only, which does not imply endorsement, sponsorship or affiliation of any kind.",
    ],
  },
  {
    heading: "No bookings, no payments",
    body: [
      "This site does not take bookings, deposits, pre-booking amounts, token payments or money of any kind, and it never will. We do not process transactions and hold no payment infrastructure.",
      "The signup form on this site is a free launch-alert mailing list. It does not reserve a vehicle, does not place you in a delivery queue and creates no obligation on anyone.",
      `If you encounter any page, message or account claiming to take payment on behalf of this site, it is not us. Please report it — ${contactInstruction} — so we can warn other readers.`,
    ],
  },
  {
    heading: "Accuracy of information",
    body: [
      "Specifications, prices, launch dates, range figures and feature lists on this site are compiled from manufacturer material, published technical documentation, public filings and our own analysis. Much of it concerns vehicles that have not launched in India, where nothing is final until the manufacturer homologates it.",
      "Where a figure is a manufacturer claim on a particular test cycle, we name the cycle. Where a figure is our own estimate, we label it as an estimate and show the reasoning. We do not present expected figures as confirmed ones.",
      "Despite that care, information here may be incomplete, out of date or wrong. Confirm anything you intend to act on with an authorised dealer or the manufacturer before you commit money to it.",
    ],
  },
  {
    heading: "Not professional advice",
    body: [
      "Nothing on this site is financial, legal, tax or insurance advice. Articles about state subsidies, road tax exemptions, GST treatment and incentive schemes describe our reading of publicly available policy documents at the time of writing.",
      "Policies change, lapse, get extended on different terms, and are applied differently by different authorities. Verify your own entitlement against the current notification from your state transport department, and take professional advice where the amounts matter.",
    ],
  },
  {
    heading: "Vehicle use and safety",
    body: [
      "Guidance on charging practice, battery care, off-road driving and water wading is general information, not instructions for your specific vehicle. Your owner's manual and the manufacturer's guidance take precedence over anything written here.",
      "Off-road driving and deep-water crossings carry real risk of injury and vehicle damage, and may void warranty cover. Assess conditions yourself and do not rely on any figure published here to decide whether an obstacle is safe.",
    ],
  },
  {
    heading: "Advertising and how this site is funded",
    body: [
      "This site is supported by advertising served by third-party networks, including Google. Advertisements are selected automatically and their presence is not an endorsement of the advertiser, its products or its claims.",
      "We do not accept payment for editorial coverage, do not run sponsored articles, and do not operate affiliate booking links. If that ever changes, it will be disclosed clearly on the page in question.",
      "How advertising cookies work on this site, including Google's DART cookie, is described in our privacy and cookie policies.",
    ],
  },
  {
    heading: "External links",
    body: [
      "We link to manufacturer sites, government notifications, charging networks and other third-party resources for reference. We do not control those sites and are not responsible for their content, accuracy or privacy practices.",
      "A link is not an endorsement, and following one takes you outside this site's policies.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "This site and everything on it is provided on an “as is” basis, without warranties of any kind. To the fullest extent permitted by law, we accept no liability for loss or damage arising from reliance on anything published here.",
      "Your decision to buy, book, modify or drive a vehicle is yours alone.",
    ],
  },
  {
    heading: "Corrections",
    body: [
      `If something here is wrong, tell us — ${contactInstruction}, including the correction and a source. We publish corrections in place, mark the article as updated, and credit the correction where the sender is willing.`,
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <PageShell
      title="Disclaimer"
      intro="What this site is, what it is not, and the limits of what you should rely on it for."
    >
      <LegalDoc updated="18 August 2026" sections={SECTIONS} />
    </PageShell>
  );
}

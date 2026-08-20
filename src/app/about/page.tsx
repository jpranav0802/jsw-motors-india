import type { Metadata } from "next";
import Link from "next/link";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { AuthorCard } from "@/components/editorial/AuthorCard";
import { Bullets, Paragraphs, SectionHeading } from "@/components/editorial/Prose";
import { PageShell } from "@/components/PageShell";
import { contactEmail } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "About Us & Editorial Mission",
  description:
    "Who runs this site, why it exists, how we research and evaluate electric and hybrid vehicles in India, and how to reach the editor.",
  alternates: { canonical: "/about" },
};

const MISSION = [
  "This site exists because the coverage of India's incoming new-energy vehicles was, for a long time, either a lightly reworded press release or an unsourced rumour with a launch date attached. Neither helps someone deciding whether to spend twenty or thirty lakh rupees. We started publishing our own working — the spec sheets read line by line, the range figures converted into what they mean on an Indian road in May, the state road-tax notifications read in full — because that was the material we wanted and could not find in one place.",
  "The editorial scope is deliberately narrow. We cover the vehicles built on JSW MG Motor India's announced platforms and the wider NEV lineup around them — currently the Jetour T2, the Jaecoo J5 and the JSW V23 — plus the ownership questions that sit underneath any electric or hybrid purchase in India: charging access, cost per kilometre, battery care in extreme heat, and the state-by-state incentive structure that can swing the on-road price of the same car by two lakh rupees.",
  "Our research process is unglamorous. Specifications come from manufacturer material, homologation filings, and published technical documentation, and we say which. Where a figure is a manufacturer claim on a particular test cycle, we name the cycle, because NEDC, MIDC and WLTP are not interchangeable and treating them as such is how range disappointment happens. Where a number is our own estimate — real-world range, expected pricing, likely battery chemistry — it is labelled as an estimate with the reasoning shown, so you can disagree with the assumption rather than the conclusion.",
  "How we evaluate electric and hybrid vehicles follows from that. We weight the things that decide ownership in India rather than the things that photograph well: whether the pack chemistry suits daily full charging in 45°C heat, whether the DC charging curve holds or tapers early, what the car does at a sustained 100 km/h rather than on a certification cycle, and how deep the service network is in the city where the car will actually live. Feature counts and screen sizes matter less to us than they do to a brochure, and we will say so.",
  "We publish nothing on behalf of a manufacturer or dealer. We do not accept payment for coverage, we do not take pre-booking money or deposits of any kind, and we have no commercial relationship with any of the companies whose products we write about. The site is supported by advertising, which is disclosed in our privacy and cookie policies. When we get something wrong we correct it in place and mark the article as updated rather than quietly editing it.",
];

const PRINCIPLES = [
  "Name the source of every specification, and name the test cycle behind every range claim.",
  "Label estimates as estimates, and show the arithmetic so a reader can substitute their own inputs.",
  "Never present an unlaunched car's expected figures as confirmed ones.",
  "Correct errors in place, mark the update date, and do not delete the original claim silently.",
  "No paid coverage, no affiliate booking flows, no deposits — ever.",
];

const LINEUP = [
  { name: "Jetour T2", href: "/", note: "Adventure SUV — monocoque, automatic XWD, 220 mm clearance" },
  { name: "Jaecoo J5", href: "/jaecoo-j5", note: "Premium electric SUV — up to 500 km claimed range, V2L" },
  { name: "JSW V23", href: "/v23", note: "Retro electric city car — 211 PS, 430 km NEDC, 2WD and 4WD" },
];

export default function AboutPage() {
  return (
    <PageShell
      title="About this site"
      intro="An independent portal covering India's incoming new-energy vehicles — what they are, what they will actually do on Indian roads, and what they will cost to run."
    >
      <div className="max-w-[8.4rem] space-y-[0.7rem] md:space-y-[0.5rem]">
        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>Editorial mission</SectionHeading>
          <Paragraphs items={MISSION} />
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>How we work</SectionHeading>
          <Bullets items={PRINCIPLES} />
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>Editorial team</SectionHeading>
          <Paragraphs
            items={[
              "The site is written and edited by one person. That is a limitation and we would rather state it than imply a newsroom that does not exist — it also means there is always a named human accountable for every figure published here.",
            ]}
          />
          <AuthorCard />
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>What we cover</SectionHeading>
          <ul className="space-y-[0.2rem] md:space-y-[0.14rem]">
            {LINEUP.map((model) => (
              <li key={model.name} className="border-b border-black/10 pb-[0.2rem] md:pb-[0.14rem]">
                <Link href={model.href} className="group flex flex-wrap items-baseline gap-x-[0.24rem] gap-y-[0.06rem]">
                  <span className="font-display text-[0.32rem] md:text-[0.19rem] underline-offset-4 group-hover:underline">
                    {model.name}
                  </span>
                  <span className="text-[0.24rem] md:text-sm text-black/50">{model.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Paragraphs
            items={[
              "Alongside the model coverage we publish long-form ownership guides — charging economics, battery care, state incentives and powertrain comparisons.",
            ]}
          />
          <p className="text-[0.28rem] md:text-base text-black/60">
            <Link href="/guides" className="underline underline-offset-2 hover:text-black">
              Read the EV guides
            </Link>
          </p>
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>Contact</SectionHeading>
          <Paragraphs
            items={[
              "Corrections, questions, tip-offs and complaints all go to the same monitored inbox, and the editor reads them personally. If you are correcting a figure, please include a source — we will publish the correction and credit it.",
            ]}
          />
          <p className="text-[0.28rem] md:text-base text-black/70">
            Email:{" "}
            <a href={`mailto:${contactEmail}`} className="underline underline-offset-2 hover:text-black">
              {contactEmail}
            </a>{" "}
            · more on the{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-black">
              contact page
            </Link>
            .
          </p>
        </section>

        <AffiliationNotice />
      </div>
    </PageShell>
  );
}

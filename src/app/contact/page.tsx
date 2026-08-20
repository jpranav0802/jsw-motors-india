import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/ContactForm";
import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { Bullets, Paragraphs, SectionHeading } from "@/components/editorial/Prose";
import { PageShell } from "@/components/PageShell";
import { contactEmail, editor } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the editor of jswmotorsindia.com — corrections, questions, tip-offs and feedback go to a monitored inbox and are answered personally.",
  alternates: { canonical: "/contact" },
};

const WHAT_WE_ANSWER = [
  "Corrections to any figure published on this site — please include a source and we will credit it.",
  "Questions about powertrains, charging, running costs or state EV policy that the guides do not already cover.",
  "Tip-offs on launch timing, homologation filings or dealer-level information, treated confidentially if you ask.",
  "Feedback on the site itself, including anything that reads as unclear, biased or wrong.",
];

const WHAT_WE_CANNOT_DO = [
  "Take bookings, deposits or pre-booking payments of any kind. We are not a dealer and never handle money.",
  "Arrange test drives, allocations or delivery dates — those come from authorised dealers only.",
  "Quote on-road prices for unlaunched models, because they do not exist until the manufacturer announces them.",
];

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      intro="Write to the editor. Every message reaches a monitored inbox and is read by a person, not a queue."
    >
      <div className="max-w-[8.4rem] space-y-[0.7rem] md:space-y-[0.5rem]">
        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>Send a message</SectionHeading>
          <Paragraphs
            items={[
              `Use the form below, or email ${contactEmail} directly if you prefer. Replies normally take two or three working days.`,
            ]}
          />
          <ContactForm />
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>What we can help with</SectionHeading>
          <Bullets items={WHAT_WE_ANSWER} />
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>What we cannot do</SectionHeading>
          <Bullets items={WHAT_WE_CANNOT_DO} />
          <Paragraphs
            items={[
              "If you want to be told when a model is priced and launched, register your interest instead — it is a free notification registry, not a booking.",
            ]}
          />
          <p className="text-[0.28rem] md:text-base text-black/60">
            <Link href="/register" className="underline underline-offset-2 hover:text-black">
              Register your interest
            </Link>
          </p>
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>Who you are writing to</SectionHeading>
          <Paragraphs
            items={[
              `${editor.name}, ${editor.role.toLowerCase()}, based in ${editor.location}. Every article on this site carries the same byline, and corrections are published in place with the update date shown.`,
            ]}
          />
          <p className="text-[0.28rem] md:text-base text-black/70">
            Email:{" "}
            <a href={`mailto:${contactEmail}`} className="underline underline-offset-2 hover:text-black">
              {contactEmail}
            </a>
          </p>
        </section>

        <AffiliationNotice />
      </div>
    </PageShell>
  );
}

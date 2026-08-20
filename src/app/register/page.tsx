import type { Metadata } from "next";
import Link from "next/link";

import { AffiliationNotice } from "@/components/editorial/AffiliationNotice";
import { Bullets, Callout, Paragraphs, SectionHeading } from "@/components/editorial/Prose";
import { PageShell } from "@/components/PageShell";
import { RegisterForm } from "@/components/RegisterForm";
import { contactEmail } from "@/lib/editorial";

export const metadata: Metadata = {
  title: "Register Your Interest",
  description:
    "Register your interest in the Jetour T2, Jaecoo J5 or JSW V23 and we'll keep you posted as the India launch nears. A free interest registry run by an independent portal — no bookings, no deposits, no payments of any kind.",
  alternates: { canonical: "/register" },
};

const WHAT_YOU_GET = [
  "An email when the model you registered for is officially priced or launched in India.",
  "New long-form guides as they are published: charging costs, battery care, state incentives, competitor comparisons.",
  "Corrections when a figure we published turns out to be wrong, so you are not left acting on it.",
];

const WHAT_THIS_IS_NOT = [
  "Registering interest is not a booking. It gives you no place in any queue, no allocation and no delivery slot.",
  "We take no money — no token amount, no deposit, no pre-booking fee, ever. Any page asking you for one is not us.",
  "We are not a dealer and have no dealer relationships, so we cannot arrange a test drive or quote an on-road price.",
];

export default function RegisterPage() {
  return (
    <PageShell
      title="Register your interest"
      intro="Tell us who you are and which model you're interested in, and we'll keep you posted as the India launch nears — plus new guides as they go up. This is an interest registry only: no payments, ever."
    >
      <div className="max-w-[8.4rem] space-y-[0.7rem] md:space-y-[0.5rem]">
        <Callout>
          This is a free interest registry run by an independent enthusiast portal. We do not take
          bookings, deposits or payments of any kind, and we are not authorised to allocate vehicles.
          Actual bookings happen only through authorised dealers.
        </Callout>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>Register</SectionHeading>
          <RegisterForm />
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>What you will actually receive</SectionHeading>
          <Bullets items={WHAT_YOU_GET} />
          <Paragraphs
            items={[
              "Every email carries an unsubscribe link, and unsubscribing removes your details from our list entirely. We do not sell or share the list, and we do not pass your details to dealers or manufacturers.",
            ]}
          />
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>What this is not</SectionHeading>
          <Bullets items={WHAT_THIS_IS_NOT} />
          <p className="text-[0.28rem] md:text-base text-black/60">
            Questions, corrections or anything that needs a reply?{" "}
            <Link href="/contact" className="underline underline-offset-2 hover:text-black">
              Use the contact form
            </Link>{" "}
            or email{" "}
            <a href={`mailto:${contactEmail}`} className="underline underline-offset-2 hover:text-black">
              {contactEmail}
            </a>
            .
          </p>
        </section>

        <section className="space-y-[0.28rem] md:space-y-[0.2rem]">
          <SectionHeading>How we handle your details</SectionHeading>
          <Paragraphs
            items={[
              "We store what you enter here so we can send you the alerts you asked for, and for no other purpose. You can ask us to show you, correct or delete that data at any time by writing to the address above.",
            ]}
          />
          <p className="text-[0.28rem] md:text-base text-black/60">
            Full detail in the{" "}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-black">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/cookies" className="underline underline-offset-2 hover:text-black">
              cookie policy
            </Link>
            .
          </p>
        </section>

        <AffiliationNotice />
      </div>
    </PageShell>
  );
}

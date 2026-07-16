import type { Metadata } from "next";

import { BookingForm } from "@/components/BookingForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = { title: "Book | JSW Motors India" };

export default function BookPage() {
  return (
    <PageShell
      title="Book a Test Drive"
      intro="Tell us where you are and which car you want to drive. We'll come back to you within two working days."
    >
      <BookingForm />
    </PageShell>
  );
}

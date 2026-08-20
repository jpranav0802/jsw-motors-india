"use client";

import { useState } from "react";

import { submitMessage } from "@/app/contact/actions";
import { contactEmail } from "@/lib/editorial";
import { cn } from "@/lib/utils";

interface Fields {
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", message: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  // Deliberately loose: reject only addresses with no hope of delivering.
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Please write at least a sentence.";
  if (values.message.length > 4000) errors.message = "Please keep it under 4,000 characters.";
  return errors;
}

const FIELD_CLASS =
  "w-full px-5 md:px-[0.16rem] bg-transparent border border-black/20 text-[0.28rem] md:text-base " +
  "outline-none transition-colors duration-300 focus:border-black";

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setFormError(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setFormError(null);
    const result = await submitMessage(values);
    setSubmitting(false);

    if (result.ok) {
      setSentTo(values.email.trim());
      setValues(EMPTY);
    } else {
      setFormError(result.error);
    }
  };

  // Embedded confirmation — replaces the form rather than navigating away.
  if (sentTo) {
    return (
      <div role="status" className="max-w-[6.4rem] border border-black/20 p-[0.5rem] md:p-[0.32rem]">
        <h2 className="font-display text-2xl">Message sent</h2>
        <p className="mt-4 text-[0.28rem] md:text-base text-black/70">
          Thanks — your message is with the editor. We reply to {sentTo} from{" "}
          <a href={`mailto:${contactEmail}`} className="underline underline-offset-2">
            {contactEmail}
          </a>
          , usually within two or three working days. If you were correcting a figure, we&apos;ll
          update the article in place and credit the correction.
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="mt-8 h-[1.0rem] md:h-[0.56rem] px-[0.34rem] md:px-[0.24rem] border border-black text-[0.28rem] md:text-base cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[6.4rem]">
      <div className="grid gap-[0.36rem] md:gap-[0.24rem]">
        <Field id="contact-name" label="Your name" error={errors.name}>
          <input
            suppressHydrationWarning
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={cn(FIELD_CLASS, "h-[1.0rem] md:h-[0.56rem]", errors.name && "border-red-600")}
          />
        </Field>

        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            suppressHydrationWarning
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={cn(FIELD_CLASS, "h-[1.0rem] md:h-[0.56rem]", errors.email && "border-red-600")}
          />
        </Field>

        <Field id="contact-message" label="Message" error={errors.message}>
          <textarea
            suppressHydrationWarning
            id="contact-message"
            rows={6}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            className={cn(FIELD_CLASS, "py-4 md:py-[0.12rem] resize-y", errors.message && "border-red-600")}
          />
        </Field>
      </div>

      {formError && (
        <p className="mt-[0.3rem] md:mt-[0.2rem] text-[0.24rem] md:text-sm text-red-600" role="alert">
          {formError} You can also email us directly at{" "}
          <a href={`mailto:${contactEmail}`} className="underline underline-offset-2">
            {contactEmail}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-[0.5rem] md:mt-[0.32rem] h-[1.0rem] md:h-[0.56rem] px-[0.4rem] md:px-[0.32rem] bg-black text-white text-[0.28rem] md:text-base cursor-pointer transition-opacity duration-300 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    // Autofill extensions inject attributes into these inputs before hydration;
    // suppress the mismatch they cause.
    <div suppressHydrationWarning>
      <label htmlFor={id} className="block text-[0.24rem] md:text-sm text-black/60 mb-3 md:mb-[0.08rem]">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-[0.24rem] md:text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

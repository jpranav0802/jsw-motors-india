"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const ENQUIRY_TYPES = [
  "Feedback on product or service",
  "A question about a model or process",
  "A complaint about quality or service",
  "Something else",
];

interface Fields {
  name: string;
  email: string;
  country: string;
  city: string;
  type: string;
  message: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", country: "", city: "", type: ENQUIRY_TYPES[0], message: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  // Loose on purpose: reject only addresses with no hope of delivering.
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.country.trim()) errors.country = "Which country are you in?";
  if (!values.message.trim()) errors.message = "Add a short message so we can help.";
  return errors;
}

const FIELD_CLASS =
  "w-full h-16 md:h-[0.56rem] px-5 md:px-[0.16rem] bg-transparent border border-black/20 text-base " +
  "outline-none transition-colors duration-300 focus:border-black";

export function ContactForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [agreed, setAgreed] = useState(false);
  const [policyError, setPolicyError] = useState(false);
  const [submitted, setSubmitted] = useState<Fields | null>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setPolicyError(!agreed);
    if (Object.keys(found).length > 0 || !agreed) return;
    // No backend on this build: the enquiry resolves client-side so the flow is
    // exercisable end to end. Wire this to a real endpoint before use.
    setSubmitted(values);
  };

  if (submitted) {
    return (
      <div role="status" className="max-w-[6.4rem] border border-black/20 p-10 md:p-[0.32rem]">
        <h2 className="font-display text-2xl">Message sent</h2>
        <p className="mt-4 text-base text-black/70">
          Thanks {submitted.name.trim()} — we&apos;ve received your message and will reply to{" "}
          {submitted.email.trim()} within two working days.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(null);
            setValues(EMPTY);
            setAgreed(false);
          }}
          className="mt-8 h-16 md:h-[0.56rem] px-8 md:px-[0.24rem] border border-black text-base cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[6.4rem]">
      <div className="grid gap-8 md:gap-[0.24rem] md:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={cn(FIELD_CLASS, errors.name && "border-red-600")}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={cn(FIELD_CLASS, errors.email && "border-red-600")}
          />
        </Field>

        <Field id="country" label="Country" error={errors.country}>
          <input
            id="country"
            type="text"
            autoComplete="country-name"
            value={values.country}
            onChange={(e) => set("country", e.target.value)}
            aria-invalid={!!errors.country}
            className={cn(FIELD_CLASS, errors.country && "border-red-600")}
          />
        </Field>

        <Field id="city" label="City">
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            className={FIELD_CLASS}
          />
        </Field>

        <Field id="type" label="What's this about?">
          <select
            id="type"
            value={values.type}
            onChange={(e) => set("type", e.target.value)}
            className={cn(FIELD_CLASS, "cursor-pointer")}
          >
            {ENQUIRY_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-8 md:mt-[0.24rem]">
        <Field id="message" label="Message" error={errors.message}>
          <textarea
            id="message"
            rows={4}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={!!errors.message}
            className={cn(
              FIELD_CLASS,
              "h-auto py-4 md:py-[0.16rem] resize-y",
              errors.message && "border-red-600",
            )}
          />
        </Field>
      </div>

      <label className="mt-8 md:mt-[0.24rem] flex items-start gap-3 md:gap-[0.1rem] text-sm text-black/60 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => {
            setAgreed(e.target.checked);
            if (e.target.checked) setPolicyError(false);
          }}
          className="mt-1 size-5 md:size-[0.16rem] shrink-0 accent-black cursor-pointer"
        />
        <span>
          I have read and agree to the{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-black">
            Privacy Policy
          </a>
          .
        </span>
      </label>
      {policyError && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          Please agree to the Privacy Policy to continue.
        </p>
      )}

      <button
        type="submit"
        className="mt-10 md:mt-[0.32rem] h-16 md:h-[0.56rem] px-10 md:px-[0.32rem] bg-black text-white text-base cursor-pointer transition-opacity duration-300 hover:opacity-80"
      >
        Send
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
    <div>
      <label htmlFor={id} className="block text-sm text-black/60 mb-3 md:mb-[0.08rem]">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

import { submitRegistration } from "@/app/register/actions";
import { cn } from "@/lib/utils";

const MODELS = ["Jetour T2", "Jaecoo J5", "V23"];

interface Fields {
  name: string;
  email: string;
  phone: string;
  city: string;
  model: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", phone: "", city: "", model: MODELS[0] };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  // Deliberately loose: reject only addresses with no hope of delivering.
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  // At least seven digits, allowing +, spaces, dashes and parens around them.
  if (values.phone.replace(/[\s()+-]/g, "").length < 7 || !/^[\d\s()+-]+$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!values.city.trim()) errors.city = "Which city are you in?";
  return errors;
}

const FIELD_CLASS =
  "w-full h-[1.0rem] md:h-[0.56rem] px-5 md:px-[0.16rem] bg-transparent border border-black/20 text-[0.28rem] md:text-base " +
  "outline-none transition-colors duration-300 focus:border-black";

export function RegisterForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<Fields | null>(null);

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
    const result = await submitRegistration(values);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(values);
    } else {
      setFormError(result.error);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="max-w-[6.4rem] border border-black/20 p-[0.5rem] md:p-[0.32rem]">
        <h2 className="font-display text-2xl">Interest registered</h2>
        <p className="mt-4 text-[0.28rem] md:text-base text-black/70">
          Thanks {submitted.name.trim()} — we&apos;ve registered your interest in the{" "}
          {submitted.model}. We&apos;ll reach out to {submitted.email.trim()} as the India launch
          nears.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(null);
            setValues(EMPTY);
          }}
          className="mt-8 h-[1.0rem] md:h-[0.56rem] px-[0.34rem] md:px-[0.24rem] border border-black text-[0.28rem] md:text-base cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
        >
          Register another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[6.4rem]">
      <div className="grid gap-[0.36rem] md:gap-[0.24rem] md:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}>
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

        <Field id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
            className={cn(FIELD_CLASS, errors.phone && "border-red-600")}
          />
        </Field>

        <Field id="city" label="City" error={errors.city}>
          <input
            id="city"
            type="text"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => set("city", e.target.value)}
            aria-invalid={!!errors.city}
            className={cn(FIELD_CLASS, errors.city && "border-red-600")}
          />
        </Field>

        <Field id="model" label="Model of interest">
          <select
            id="model"
            value={values.model}
            onChange={(e) => set("model", e.target.value)}
            className={cn(FIELD_CLASS, "cursor-pointer")}
          >
            {MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {formError && (
        <p className="mt-[0.3rem] md:mt-[0.2rem] text-[0.24rem] md:text-sm text-red-600" role="alert">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-[0.5rem] md:mt-[0.32rem] h-[1.0rem] md:h-[0.56rem] px-[0.4rem] md:px-[0.32rem] bg-black text-white text-[0.28rem] md:text-base cursor-pointer transition-opacity duration-300 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Registering…" : "Register interest"}
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
    // Autofill/password-manager extensions inject attributes and nodes into
    // these inputs before hydration; suppress the mismatch they cause.
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

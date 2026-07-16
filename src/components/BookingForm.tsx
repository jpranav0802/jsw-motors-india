"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const MODELS = ["Jetour T2", "Jaecoo J5", "V23"];

interface Fields {
  name: string;
  email: string;
  city: string;
  model: string;
  date: string;
}

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = { name: "", email: "", city: "", model: MODELS[0], date: "" };

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  // Deliberately loose: the only thing worth rejecting here is an address with
  // no hope of delivering, and stricter patterns reject valid addresses.
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.city.trim()) errors.city = "Which city should we arrange this in?";
  if (!values.date) errors.date = "Pick a preferred date.";
  else if (values.date < new Date().toISOString().slice(0, 10)) {
    errors.date = "Pick a date in the future.";
  }
  return errors;
}

const FIELD_CLASS =
  "w-full h-16 md:h-[0.56rem] px-5 md:px-[0.16rem] bg-transparent border border-black/20 text-base " +
  "outline-none transition-colors duration-300 focus:border-black";

export function BookingForm() {
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<Fields | null>(null);

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    // No backend on this build: the booking is confirmed client-side so the
    // flow is exercisable end to end. Wire this to a real endpoint before use.
    setSubmitted(values);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="max-w-[6.4rem] border border-black/20 p-10 md:p-[0.32rem]"
      >
        <h2 className="font-display text-2xl">Booking received</h2>
        <p className="mt-4 text-base text-black/70">
          Thanks {submitted.name.trim()} — we&apos;ve got your request for a{" "}
          {submitted.model} in {submitted.city.trim()} on {submitted.date}. A confirmation
          is on its way to {submitted.email.trim()}.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(null);
            setValues(EMPTY);
          }}
          className="mt-8 h-16 md:h-[0.56rem] px-8 md:px-[0.24rem] border border-black text-base cursor-pointer transition-colors duration-300 hover:bg-black hover:text-white"
        >
          Book another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-[6.4rem]">
      <div className="grid gap-8 md:gap-[0.24rem] md:grid-cols-2">
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

        <Field id="model" label="Model">
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

        <Field id="date" label="Preferred date" error={errors.date}>
          <input
            id="date"
            type="date"
            value={values.date}
            onChange={(e) => set("date", e.target.value)}
            aria-invalid={!!errors.date}
            className={cn(FIELD_CLASS, errors.date && "border-red-600")}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-10 md:mt-[0.32rem] h-16 md:h-[0.56rem] px-10 md:px-[0.32rem] bg-black text-white text-base cursor-pointer transition-opacity duration-300 hover:opacity-80"
      >
        Request booking
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

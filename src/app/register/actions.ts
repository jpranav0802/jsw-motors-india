"use server";

export interface RegistrationInput {
  name: string;
  email: string;
  phone: string;
  city: string;
  model: string;
}

export type RegistrationResult =
  | { ok: true }
  | { ok: false; error: string; unconfigured?: boolean };

/**
 * Persists an interest registration to Supabase.
 *
 * Runs server-side (never exposes the key to the client) and talks to Supabase's
 * PostgREST endpoint directly, so no client library is needed. Expects two env
 * vars in `.env.local`:
 *   SUPABASE_URL=https://<project-ref>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<service role key>
 * and a `public.registrations` table (see the README/setup notes).
 */
export async function submitRegistration(input: RegistrationInput): Promise<RegistrationResult> {
  // Trust nothing from the client — re-validate here.
  const name = input.name?.trim();
  const email = input.email?.trim();
  const phone = input.phone?.trim();
  const city = input.city?.trim();
  const model = input.model?.trim();

  if (!name || !email || !phone || !model || !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Please fill in your name, a valid email, phone and model." };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return {
      ok: false,
      unconfigured: true,
      error: "Registrations aren't connected to a database yet.",
    };
  }

  try {
    const res = await fetch(`${url}/rest/v1/registrations`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, email, phone, city: city || null, model }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Supabase insert failed:", res.status, await res.text());
      return { ok: false, error: "Something went wrong saving your details. Please try again." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Supabase insert error:", error);
    return { ok: false, error: "Couldn't reach the server. Please check your connection and retry." };
  }
}

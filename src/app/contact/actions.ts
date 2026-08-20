"use server";

export interface MessageInput {
  name: string;
  email: string;
  message: string;
}

export type MessageResult =
  | { ok: true }
  | { ok: false; error: string; unconfigured?: boolean };

/**
 * Persists a contact-form message.
 *
 * Writes into the same `public.registrations` table the interest registry uses,
 * distinguished by `kind = 'contact'` and carrying the free-text `message`
 * column (see docs/SUPABASE_SETUP.md for the two ALTER statements this needs).
 * Same anon-key + row-level-security arrangement as the registration action:
 * the public key may insert but never read back.
 */
export async function submitMessage(input: MessageInput): Promise<MessageResult> {
  // Trust nothing from the client — re-validate here.
  const name = input.name?.trim();
  const email = input.email?.trim();
  const message = input.message?.trim();

  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, error: "Please fill in your name, a valid email and a message." };
  }
  if (message.length > 4000) {
    return { ok: false, error: "That message is too long — please keep it under 4,000 characters." };
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return {
      ok: false,
      unconfigured: true,
      error: "The contact form isn't connected to a database yet.",
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
      body: JSON.stringify({ name, email, message, kind: "contact" }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Supabase message insert failed:", res.status, await res.text());
      return { ok: false, error: "Something went wrong sending your message. Please try again." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Supabase message insert error:", error);
    return { ok: false, error: "Couldn't reach the server. Please check your connection and retry." };
  }
}

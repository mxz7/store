import type { Authed, Unauthed } from "$lib/types/auth.js";

export async function load({ fetch }) {
  const auth: Promise<Authed | Unauthed> = fetch("/api/auth").then((r) => r.json());

  return { auth };
}

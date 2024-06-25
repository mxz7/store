import { writable } from "svelte/store";
import type { Authed, Unauthed } from "./types/auth";

export const auth = writable<Authed | Unauthed>();
export const dashboard = writable<boolean>(false);

export async function getLocalAuth() {
  const res = await fetch("/api/auth").then((r) => r.json());

  console.log(res);

  auth.set({ authenticated: res, ...res.user });
}

import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const auth = await locals.validate(false);

  if (!auth.authenticated) return redirect(302, "/login");

  return { auth };
}

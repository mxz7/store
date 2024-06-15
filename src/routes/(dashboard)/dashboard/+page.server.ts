import db from "$lib/server/database/db.js";
import { uploads } from "$lib/server/database/schema.js";
import { redirect } from "@sveltejs/kit";
import { desc } from "drizzle-orm";

export async function load({ locals, url }) {
  const auth = await locals.validate();

  if (!auth) return redirect(302, "/login");

  let page = parseInt(url.searchParams.get("page") || "1") || 1;

  if (page < 1) page = 1;

  const files = await db
    .select({
      id: uploads.id,
      createdAt: uploads.createdAt,
      bytes: uploads.bytes,
      label: uploads.label,
    })
    .from(uploads)
    .orderBy(desc(uploads.createdAt))
    .offset((page - 1) * 25)
    .limit(25);

  if (files.length === 0 && page > 1) {
    url.searchParams.set("page", (page - 1).toString());
    return redirect(302, `/dashboard?${url.searchParams.toString()}`);
  }

  return { files, user: auth.user };
}

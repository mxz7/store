import db from "$lib/server/database/db.js";
import { uploads } from "$lib/server/database/schema.js";
import { redirect } from "@sveltejs/kit";
import { desc, eq, sql } from "drizzle-orm";
import { fail, message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { object, string } from "zod";

const renameSchema = object({
  id: string(),
  label: string().min(0).max(100),
});

export async function load({ locals, url, depends }) {
  depends("file_uploads");

  const auth = await locals.validate();

  if (!auth.authenticated) return redirect(302, "/login");

  let page = parseInt(url.searchParams.get("page") || "1") || 1;

  if (page < 1) page = 1;

  const files = await db
    .select({
      id: uploads.id,
      createdAt: uploads.createdAt,
      bytes: uploads.bytes,
      label: uploads.label,
      expireAt: uploads.expireAt,
      deleted: sql<boolean>`false`,
    })
    .from(uploads)
    .orderBy(desc(uploads.createdAt))
    .offset((page - 1) * 25)
    .limit(25);

  if (files.length === 0 && page > 1) {
    url.searchParams.set("page", (page - 1).toString());
    return redirect(302, `/files?${url.searchParams.toString()}`);
  }

  return { files, user: auth.user, form: await superValidate(zod(renameSchema)) };
}

export const actions = {
  rename: async ({ locals, request }) => {
    const auth = await locals.validate();

    if (!auth.authenticated) return fail(400);

    const form = await superValidate(request, zod(renameSchema));

    if (!form.valid) return fail(400, { form });

    const upload = await db
      .select({ createdBy: uploads.createdByUser })
      .from(uploads)
      .where(eq(uploads.id, form.data.id))
      .limit(1)
      .then((r) => r[0]);

    if (upload.createdBy !== auth.user.id) return fail(400, { form });

    await db.update(uploads).set({ label: form.data.label }).where(eq(uploads.id, form.data.id));

    return message(form, "success");
  },
};

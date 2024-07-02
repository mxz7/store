import { EXPIRE_AUTH } from "$env/static/private";
import db from "$lib/server/database/db.js";
import { uploads } from "$lib/server/database/schema.js";
import s3 from "$lib/server/s3.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { error } from "@sveltejs/kit";
import { eq, lte } from "drizzle-orm";

export const config = {
  runtime: "nodejs20.x",
  regions: ["lhr1"],
};

export async function DELETE({ request }) {
  const auth = request.headers.get("Authorization");

  if (auth !== EXPIRE_AUTH) return error(401);

  const expired = await db
    .select({ id: uploads.id })
    .from(uploads)
    .where(lte(uploads.expireAt, new Date()));

  for (const expiredItem of expired) {
    await s3.send(new DeleteObjectCommand({ Bucket: "maxz-dev", Key: expiredItem.id }));
    await db.delete(uploads).where(eq(uploads.id, expiredItem.id));
  }

  console.log(`deleted ${expired.length} expired uploads`);
}

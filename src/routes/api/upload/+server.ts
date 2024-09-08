import { nanoid } from "$lib/nanoid.js";
import db from "$lib/server/database/db.js";
import { uploads } from "$lib/server/database/schema.js";
import s3 from "$lib/server/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { error, json } from "@sveltejs/kit";
import dayjs from "dayjs";

export const config = {
  runtime: "nodejs20.x",
  regions: ["lhr1"],
};

export async function POST({ locals, getClientAddress, request }) {
  const auth = await locals.validate(false);

  if (!auth.authenticated) return error(401);

  const { type, size, label, expire } = await request.json();

  if (size > 1000000000) return error(400);
  if (expire > 31556952000 && !auth.user.admin) return error(400);

  const id = `${nanoid()}.${type.split("/")[1]}`;

  const presigned = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: "maxz-dev",
      Key: id,
      ContentType: type,
      ContentLength: parseInt(size),
    }),
    { expiresIn: 300 },
  );
  await db.insert(uploads).values({
    bytes: size,
    createdIp: getClientAddress(),
    id,
    label,
    createdByUser: auth.user.id,
    expireAt: dayjs().add(expire, "milliseconds").toDate(),
    createdAt: new Date(),
  });

  return json({ url: presigned, id });
}

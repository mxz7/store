import { nanoid } from "$lib/nanoid.js";
import db from "$lib/server/database/db.js";
import { uploads } from "$lib/server/database/schema.js";
import s3 from "$lib/server/s3.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { fail, redirect } from "@sveltejs/kit";
import dayjs from "dayjs";

export async function load({ parent }) {
  const { auth } = await parent();

  if (!auth.authenticated) return redirect(302, "/login");
}

// export const actions = {
//   default: async ({ request, locals, getClientAddress }) => {
//     const auth = await locals.validate(false);

//     if (!auth.authenticated) return fail(401);

//     const { type, size } = await request.json();

//     if (size > 1000000000) return fail(400);

//     const id = `${nanoid()}.${type.split("/")[1]}`;

//     const presigned = await getSignedUrl(
//       s3,
//       new PutObjectCommand({
//         Bucket: "maxz-dev",
//         Key: id,
//         ContentType: type,
//         ContentLength: parseInt(size),
//       }),
//       { expiresIn: 300 },
//     );
//     await db.insert(uploads).values({
//       bytes: size,
//       createdIp: getClientAddress(),
//       id,
//       createdByUser: auth.user.id,
//       expireAt: dayjs().add(1, "year").toDate(),
//       createdAt: new Date(),
//     });

//     return { url: presigned };
//   },
// };

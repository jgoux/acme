import { db } from "#config/drizzle/db.js";
import { t } from "#config/trpc.js";

export const listPostsProcedure = t.procedure.query(async () => {
  const posts = await db.query.posts.findMany();

  return posts;
});

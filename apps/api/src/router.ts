import { t } from "#config/trpc.js";
import { db } from "./config/drizzle/db.js";

export const appRouter = t.router({
  posts: t.router({
    list: t.procedure.query(async () => {
      const posts = await db.query.posts.findMany();

      return posts;
    }),
  }),
});

export type AppRouter = typeof appRouter;

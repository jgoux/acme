import { hello } from "@acme/sdk";
import * as v from "valibot";
import { t } from "#config/trpc.js";
import { db } from "./config/drizzle/db.js";

export const appRouter = t.router({
  posts: t.router({
    list: t.procedure.query(async () => {
      const posts = await db.query.posts.findMany();

      return posts;
    }),
  }),
  hello: t.procedure
    .input((i) =>
      v.parse(
        v.object({
          name: v.string(),
        }),
        i,
      ),
    )
    .query(({ input }) => {
      return hello(input.name);
    }),
});

export type AppRouter = typeof appRouter;

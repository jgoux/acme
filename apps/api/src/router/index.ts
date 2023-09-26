import { t } from "#config/trpc.js";
import { helloProcedure } from "./hello.js";
import { postsRouter } from "./posts/index.js";

export const appRouter = t.router({
  healthcheck: t.procedure.query(() => "ok"),
  hello: helloProcedure,
  posts: postsRouter,
});

export type AppRouter = typeof appRouter;

import { t } from "#config/trpc.js";
import { helloProcedure } from "./hello.js";
import { postsRouter } from "./posts/index.js";

export const appRouter = t.router({
  posts: postsRouter,
  hello: helloProcedure,
});

export type AppRouter = typeof appRouter;

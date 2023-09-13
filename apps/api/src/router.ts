import * as v from "valibot";
import { t } from "#config/trpc.js";

export const appRouter = t.router({
  greeting: t.procedure
    .input((i) => v.parse(v.object({ name: v.optional(v.string()) }), i))
    .query(async ({ input }) => {
      return { greeting: `Hello ${input.name ?? "World"}!` };
    }),
});

export type AppRouter = typeof appRouter;

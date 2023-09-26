import { hello } from "@acme/core";
import * as v from "valibot";
import { t } from "#config/trpc.js";

export const helloProcedure = t.procedure
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
  });

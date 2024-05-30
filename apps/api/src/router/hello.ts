import { Fish, hello } from "@acme/core";
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
    const fish = new Fish(input.name);
    fish.speak();
    return hello(input.name);
  });

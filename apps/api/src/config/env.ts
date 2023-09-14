import * as v from "valibot";

export const env = v.parse(
  v.object({
    DATABASE_URL: v.string(),
  }),
  process.env,
);

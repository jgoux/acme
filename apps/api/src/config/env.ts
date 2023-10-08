import * as v from "valibot";

export const env = v.parse(
  v.object({
    DATABASE_URL: v.optional(
      v.string(),
      "postgresql://postgres@localhost:2345/acme",
    ),
  }),
  process.env,
);

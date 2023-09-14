import { type Config } from "drizzle-kit";
import { env } from "#config/env.ts";

export default {
  schema: "./src/config/drizzle/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;

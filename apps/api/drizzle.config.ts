import { type Config } from "drizzle-kit";

export default {
  schema: "./src/config/drizzle/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      process.env["DATABASE_URL"] ??
      "postgresql://postgres@localhost:2345/acme",
  },
} satisfies Config;

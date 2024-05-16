import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/config/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env["DATABASE_URL"] ??
      "postgresql://postgres@localhost:2345/acme",
  },
  verbose: true,
  strict: true,
});

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "#config/env.js";
import { posts, postsRelations, users, usersRelations } from "./schema.js";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient, {
  schema: { posts, postsRelations, users, usersRelations },
});

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "#config/env.js";
import * as schema from "./schema.js";

const queryClient = postgres(env.DATABASE_URL);

export const db = drizzle(queryClient, { schema });

// const users = await db.query.users.findFirst({
//   where: (u, _) => _.eq(u.id, 1),
//   with: {
//     posts: true,
//   },
//   columns: {
//     fullName: true,
//   },
// });

export * from "drizzle-orm";
export * as schema from "./schema.js";

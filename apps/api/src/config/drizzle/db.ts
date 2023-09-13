import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";

const queryClient = postgres("postgres://postgres:adminadmin@0.0.0.0:5432/db");

export const db = drizzle(queryClient, { schema });

// await db.query.users.findFirst({
//   where: (f, o) => o.eq(f.id, 1),
// });

export * from "drizzle-orm";
export * as schema from "./schema/index.js";

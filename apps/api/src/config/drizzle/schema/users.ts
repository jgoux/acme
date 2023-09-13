import * as d from "drizzle-orm/pg-core";

export const users = d.pgTable("users", {
  id: d.serial("id").primaryKey(),
  fullName: d.text("full_name"),
});

import { relations } from "drizzle-orm";
import * as d from "drizzle-orm/pg-core";

export const users = d.pgTable("users", {
  id: d.serial("id").primaryKey(),
  fullName: d.text("full_name"),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = d.pgTable("posts", {
  id: d.serial("id").primaryKey(),
  content: d.text("content"),
  writtenBy: d.integer("written_by"),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.writtenBy],
    references: [users.id],
  }),
}));

import type { Context } from "../types.js";

export function addImports(ctx: Context) {
  const { sourceFile } = ctx;

  sourceFile.addStatements(`
    import type { Faker } from "@faker-js/faker"
    import type { PrismaClient } from "@prisma/client";
    import { Prisma } from "@prisma/client"
  `);
}

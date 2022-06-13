import { PrismaClient } from "@acme/prisma";

const prisma = new PrismaClient();

const users = await prisma.user.findMany();

console.log(users);

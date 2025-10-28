import { PrismaClient } from "../../prisma/generated/client";

export const prisma = new PrismaClient({
  datasourceUrl: import.meta.env.DATABASE_URL,
});

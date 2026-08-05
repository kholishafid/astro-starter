import { PrismaClient } from "../../prisma/generated/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

export const adapter = new PrismaMariaDb({
  host: import.meta.env.DATABASE_HOST,
  database: import.meta.env.DATABASE_NAME,
  user: import.meta.env.DATABASE_USER,
  password: import.meta.env.DATABASE_PASSWORD,
});

export const prisma = new PrismaClient({
  adapter: adapter,
});

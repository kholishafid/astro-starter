import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),
  baseURL: import.meta.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin()],
  advanced: {
    cookiePrefix: "astro_starter_auth_",
  },
  session: {
    cookieCache: {
      enabled: false,
    },
  },
});

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "@/env";
import { db } from "@/server/db";

const isProduction = env.NODE_ENV === "production";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  emailAndPassword: { enabled: true },
  advanced: {
    cookiePrefix: "custom-legends",
    useSecureCookies: isProduction,
  },
});

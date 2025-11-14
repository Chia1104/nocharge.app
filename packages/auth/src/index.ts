import { connectDatabase } from "@nocharge/db/client";
import * as schemas from "@nocharge/db/schema";
import { kv } from "@nocharge/kv";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { env } from "./env";
import { useSecureCookies, getCookieDomain } from "./utils";

const database = await connectDatabase();

const getOrigin = (url?: string) => {
  if (!url) {
    return undefined;
  }
  return new URL(url).origin;
};

export const auth = betterAuth({
  appName: "NoCharge",

  /**
   * session configuration
   */
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days in seconds
    updateAge: 60 * 60 * 24, // 1 day in seconds
  },

  socialProviders: {
    github:
      env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
        ? {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          }
        : undefined,
    google:
      env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
        ? {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          }
        : undefined,
  },

  /**
   * database adapter
   */
  database: drizzleAdapter(database, {
    provider: "pg",
    schema: {
      ...schemas,
      user: schemas.users,
    },
  }),

  secondaryStorage: {
    get: async (key) => {
      const value = await kv.get<string>(key);
      return value ? value : null;
    },
    set: async (key, value, ttl) => {
      if (ttl) {
        await kv.set(key, value, ttl * 1000);
      } else {
        await kv.set(key, value);
      }
    },
    delete: async (key) => {
      await kv.delete(key);
    },
  },

  /**
   * base path for all auth routes
   */
  basePath: "/api/v1/auth",

  baseURL: getOrigin(env.AUTH_URL),
  secret: env.AUTH_SECRET,

  /**
   * advanced configuration
   */
  advanced: {
    cookiePrefix: "nocharge.app",
    crossSubDomainCookies: {
      enabled: true,
      domain: getCookieDomain({ env }),
    },
    defaultCookieAttributes: {
      secure: useSecureCookies,
    },
  },

  trustedOrigins: env.CORS_ALLOWED_ORIGIN
    ? env.CORS_ALLOWED_ORIGIN.split(",")
    : [],
});

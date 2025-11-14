import { env as authEnv } from "@nocharge/auth/env";
import { env as dbEnv } from "@nocharge/db/env";
import { env as kvEnv } from "@nocharge/kv/env";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.number().optional().default(3001),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .optional()
      .default("development"),
    CORS_ALLOWED_ORIGIN: z.string().optional(),
    SENTRY_DSN: z.string().optional(),
    ZEABUR_SERVICE_ID: z.string().optional(),
    IP_DENY_LIST: z.string().optional(),
    IP_ALLOW_LIST: z.string().optional(),
    MAINTENANCE_MODE: z.string().optional().default("false"),
    MAINTENANCE_BYPASS_TOKEN: z.string().optional(),
  },
  runtimeEnv: {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3001,
    NODE_ENV: process.env.NODE_ENV ?? "development",
    CORS_ALLOWED_ORIGIN: process.env.CORS_ALLOWED_ORIGIN,
    SENTRY_DSN: process.env.SENTRY_DSN,
    ZEABUR_SERVICE_ID: process.env.ZEABUR_SERVICE_ID,
    IP_DENY_LIST: process.env.IP_DENY_LIST,
    IP_ALLOW_LIST: process.env.IP_ALLOW_LIST,
    MAINTENANCE_MODE:
      process.env.MAINTENANCE_MODE === "true" ||
      process.env.MAINTENANCE_MODE === "1"
        ? "true"
        : "false",
    MAINTENANCE_BYPASS_TOKEN: process.env.MAINTENANCE_BYPASS_TOKEN,
  },
  skipValidation:
    process.env.SKIP_ENV_VALIDATION === "true" ||
    process.env.SKIP_ENV_VALIDATION === "1",
  extends: [authEnv, dbEnv, kvEnv],
});

export type ENV = typeof env;

import { getServiceEndPoint } from "@nocharge/utils/server";
import type { GetServiceEndPointOptions } from "@nocharge/utils/server";
import type { createAuthClient } from "better-auth/client";

import type { env as internalEnv } from "./env";

export const useSecureCookies = process.env.NODE_ENV === "production";
export const cookiePrefix = useSecureCookies ? "__Secure-" : "";
export const DEFAULT_COOKIE_DOMAIN = ".nocharge.app";
export const DEFAULT_TRUSTED_ORIGINS = [
  "https://nocharge.app",

  // Basic scheme
  "nocharge://",

  "nocharge-staging://",

  // Wildcard support for all paths following the scheme
  "nocharge://*",
  ...(process.env.NODE_ENV === "development"
    ? [
        "exp://*/*", // Trust all Expo development URLs
        "exp://10.0.0.*:*/*", // Trust 10.0.0.x IP range
        "exp://192.168.*.*:*/*", // Trust 192.168.x.x IP range
        "exp://172.*.*.*:*/*", // Trust 172.x.x.x IP range
        "exp://localhost:*/*", // Trust localhost
      ]
    : []),
];

export const SESSION_MAX_AGE = 2592000; // 30 days
export const SESSION_UPDATE_AGE = 86400; // 1 day

export const getCookieDomain = (options?: {
  env?: Partial<typeof internalEnv>;
}): string => {
  options ??= {};
  const { env } = options;
  const AUTH_URL = env?.AUTH_URL?.replace(/\/api\/v1\/auth$/, "");
  if (
    AUTH_URL?.includes("localhost") ??
    process.env.NODE_ENV === "development"
  ) {
    return "localhost";
  }
  return (
    env?.AUTH_COOKIE_DOMAIN ??
    AUTH_URL?.replace(/(^\w+:|^)\/\//, "") ??
    DEFAULT_COOKIE_DOMAIN
  );
};

export const sessionCookieOptions = (env?: Partial<typeof internalEnv>) =>
  ({
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: useSecureCookies,
    domain: getCookieDomain({ env }),
  }) as const;

export const baseAuthClient = (
  config?: Parameters<typeof createAuthClient>[0] & {
    serviceOptions?: GetServiceEndPointOptions;
  }
) => {
  return Object.assign(config ?? {}, {
    baseURL: `${getServiceEndPoint(undefined, config?.serviceOptions)}/auth`,
  });
};

export const getTrustedOrigins = (env?: Partial<typeof internalEnv>) => {
  const concatOrigins = [
    ...DEFAULT_TRUSTED_ORIGINS,
    ...(env?.CORS_ALLOWED_ORIGIN?.split(",") ?? []),
  ];
  return concatOrigins.filter(Boolean).map((origin) => origin.trim());
};

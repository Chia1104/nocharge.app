import { env } from "@/env";

export const getCORSAllowedOrigin = (): string[] | string => {
  if (!env.CORS_ALLOWED_ORIGIN) return "*";
  return (
    env.CORS_ALLOWED_ORIGIN?.split(",").map((item) => {
      return item.trim();
    }) ?? "*"
  );
};

export const splitString = (str?: string | null): string[] => {
  if (!str) {
    return [];
  }
  return str.split(",").map((item) => item.trim());
};

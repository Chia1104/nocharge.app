import { APIError } from "better-auth/api";
import * as z from "zod";

import type { auth } from "./";

export const Provider = {
  google: "google",
  github: "github",
} as const;

export type Provider = (typeof Provider)[keyof typeof Provider];

export const providerSchema = z.enum(Provider);

export type Session = typeof auth.$Infer.Session;

export { APIError };

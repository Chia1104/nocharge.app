import { createAuthClient as _createAuthClient } from "better-auth/client";
import type { BetterAuthClientOptions } from "better-auth/client";
import "server-only";

import { baseAuthClient } from "./utils";

export const createAuthClient = (options?: BetterAuthClientOptions) =>
  _createAuthClient(baseAuthClient(options));

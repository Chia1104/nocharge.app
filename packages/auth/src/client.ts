import type { BetterAuthClientOptions } from "better-auth";
import { createAuthClient as _createAuthClient } from "better-auth/react";
import "client-only";

import { baseAuthClient } from "./utils";

export const createAuthClient = (options?: BetterAuthClientOptions) =>
  _createAuthClient(baseAuthClient(options));

import type { GetServiceEndPointOptions } from "@nocharge/utils/server";
import type { BetterAuthClientOptions } from "better-auth";
import { createAuthClient as _createAuthClient } from "better-auth/react";
import "client-only";

import { baseAuthClient } from "./utils";

export const createAuthClient = (
  options?: BetterAuthClientOptions & {
    serviceOptions?: GetServiceEndPointOptions;
  }
) => _createAuthClient(baseAuthClient(options));

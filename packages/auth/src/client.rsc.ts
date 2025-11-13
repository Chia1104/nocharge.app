import { createAuthClient } from "better-auth/client";
import "server-only";

import { baseAuthClient } from "./utils";

export const authClient = createAuthClient(baseAuthClient({}));

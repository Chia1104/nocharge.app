import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { withServiceUrl } from "@/utils/service-url";

export const authClient = createAuthClient({
  baseURL: withServiceUrl("/auth"),
  plugins: [
    expoClient({
      scheme: "nocharge",
      storagePrefix: "nocharge",
      storage: SecureStore,
      cookiePrefix: "nocharge.app",
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;

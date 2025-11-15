import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "@nocharge/auth/client";
import * as SecureStore from "expo-secure-store";

import { getServiceUrl } from "@/utils/service-url";

export const authClient = createAuthClient({
  baseURL: getServiceUrl(),
  plugins: [
    expoClient({
      scheme: "nocharge",
      storagePrefix: "nocharge",
      storage: SecureStore,
    }),
  ],
});

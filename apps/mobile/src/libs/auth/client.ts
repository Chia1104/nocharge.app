import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "@nocharge/auth/client";
import * as SecureStore from "expo-secure-store";

import { withServiceUrl } from "@/utils/service-url";

export const authClient = createAuthClient({
  baseURL: withServiceUrl("/auth"),
  plugins: [
    expoClient({
      scheme: "nocharge",
      storagePrefix: "nocharge",
      storage: SecureStore,
    }),
  ],
  serviceOptions: {
    clientEnvPrefix: "EXPO_PUBLIC_",
  },
});

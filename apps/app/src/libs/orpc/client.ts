import type { routerContract } from "@nocharge/api/orpc/contracts";
import { getServiceEndPoint } from "@nocharge/utils/server";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { ContractRouterClient } from "@orpc/contract";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import * as Device from "expo-device";

export const link = new RPCLink({
  url: `${getServiceEndPoint(undefined, {
    clientEnvPrefix: "EXPO_PUBLIC_",
    baseUrl:
      Device.osName === "Android" && __DEV__
        ? "http://10.0.2.2:3001/api/v1"
        : undefined,
  })}/rpc`,
  async fetch(request, init) {
    const { fetch } = await import("expo/fetch");

    const resp = await fetch(request.url, {
      body: await request.blob(),
      headers: request.headers,
      method: request.method,
      signal: request.signal,
      ...init,
    });

    return resp;
  },
});

export const client: ContractRouterClient<typeof routerContract> =
  createORPCClient(link);

export const orpc = createTanstackQueryUtils(client);

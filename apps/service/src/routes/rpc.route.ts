import { router } from "@nocharge/api/orpc/router";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { Hono } from "hono";

const api = new Hono<HonoContext>();
const handler = new RPCHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

api.use("/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/api/v1/rpc",
    context: {
      headers: c.req.raw.headers,
    },
  });

  if (matched) {
    return c.newResponse(response.body, response);
  }

  await next();
});

export default api;

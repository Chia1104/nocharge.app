import { auth } from "@nocharge/auth";
import { Hono } from "hono";

const api = new Hono<HonoContext>();

api.on(["GET", "POST"], "*", (c) => {
  return auth.handler(c.req.raw);
});

export default api;

import { Hono } from "hono";

const api = new Hono<HonoContext>();

api.get("/", (c) => {
  return c.json({ status: "ok" });
});

export default api;

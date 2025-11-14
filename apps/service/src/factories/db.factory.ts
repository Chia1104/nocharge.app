import { connectDatabase } from "@nocharge/db/client";
import { kv } from "@nocharge/kv";
import { tryCatch } from "@nocharge/utils";
import { getClientIP, errorGenerator } from "@nocharge/utils/server";
import { createFactory } from "hono/factory";

export default createFactory<HonoContext>({
  initApp: (app) => {
    app.use(async (c, next) => {
      const { data: db, error: dbError } = await tryCatch(connectDatabase());

      if (dbError) {
        console.error(dbError);
        return c.json(errorGenerator(503));
      }

      c.set("clientIP", getClientIP(c.req.raw));
      c.set("db", db);
      c.set("redis", kv);
      await next();
    });
  },
});

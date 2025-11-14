import { auth } from "@nocharge/auth";
import { errorGenerator } from "@nocharge/utils/server";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";

export const verifyAuth = () =>
  createMiddleware<HonoContext>(async (c, next) => {
    try {
      const session = await auth.api.getSession({ headers: c.req.raw.headers });
      if (!session) {
        return c.json(errorGenerator(401), 401);
      }

      await next();
    } catch (error) {
      console.error(error);
      throw new HTTPException(500, {
        message: "Internal Server Error",
      });
    }
  });

import { sentry } from "@hono/sentry";
import { auth } from "@nocharge/auth";
import { getClientIP, errorGenerator } from "@nocharge/utils/server";
import type { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { ipRestriction } from "hono/ip-restriction";
import { logger } from "hono/logger";

import { env } from "@/env";
import authRoutes from "@/routes/auth.route";
import healthRoutes from "@/routes/health.route";
import subscriptionRoutes from "@/routes/subscription.route";
import workflowRoutes from "@/routes/workflow.route";

import { getCORSAllowedOrigin, splitString } from "./utils";

const bootstrap = <TContext extends HonoContext>(
  app: Hono<TContext>,
  port: number
) => {
  /**
   * logger middleware
   */
  app.use(logger());

  /**
   * Sentry middleware
   */
  app.use(
    "*",
    sentry({
      dsn: env.SENTRY_DSN,
      enabled: env.NODE_ENV === "production" && !!env.ZEABUR_SERVICE_ID,
    })
  );

  /**
   * Global error handler
   */
  app.onError((e, c) => {
    console.error(e);
    if (e instanceof HTTPException) {
      return c.json(errorGenerator(e.status), e.status);
    }
    c.get("sentry").captureException(e);
    return c.json(errorGenerator(500), 500);
  });

  /**
   * CORS middleware
   */
  app.use(
    cors({
      origin: getCORSAllowedOrigin(),
      credentials: true,
    })
  );

  app.use(
    ipRestriction((c) => getClientIP(c.req.raw), {
      denyList: splitString(env.IP_DENY_LIST),
      allowList: splitString(env.IP_ALLOW_LIST),
    })
  );

  /**
   * Rate limiter middleware
   */
  // app.use(
  //   rateLimiter({
  //     windowMs: env.RATELIMIT_WINDOW_MS,
  //     limit: env.RATELIMIT_MAX,
  //     standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  //     keyGenerator: (c) => {
  //       let info: string | null | undefined = null;
  //       try {
  //         info = getClientIP(c.req.raw);
  //       } catch (e) {
  //         console.error(e);
  //         info = null;
  //       }
  //       console.log(`root-request:${info}`);
  //       return `root-request:${info}`;
  //     },
  //   })
  // );

  /**
   * better-auth middleware
   */
  app.use("*", async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }

    c.set("user", session.user);
    c.set("session", session.session);
    return next();
  });

  /**
   * Routes
   */
  app.route("/api/v1/auth", authRoutes);
  app.route("/api/v1/subscription", subscriptionRoutes);
  app.route("/api/v1/workflow", workflowRoutes);
  app.route("/api/v1/health", healthRoutes);

  console.log(
    `Server is running on port ${port}, go to http://localhost:${port}`
  );
};

export default bootstrap;

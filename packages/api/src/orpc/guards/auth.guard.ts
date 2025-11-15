import { auth } from "@nocharge/auth";

import { baseOS } from "../utils";

export const authGuard = baseOS
  .errors({
    UNAUTHORIZED: {},
  })
  .middleware(async ({ next, context, errors }) => {
    const sessionData = await auth.api.getSession({
      headers: context.headers,
    });

    if (!sessionData?.session || !sessionData?.user) {
      throw errors.UNAUTHORIZED();
    }

    return next({
      context: {
        session: sessionData.session,
        user: sessionData.user,
      },
    });
  });

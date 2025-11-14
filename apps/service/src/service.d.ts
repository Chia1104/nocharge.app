type Bindings = import("@/env").ENV;

type Variables = {
  db: import("@nocharge/db").DB;
  redis: import("@nocharge/kv").Keyv;
  user: import("@nocharge/auth/types").Session["user"] | null;
  session: import("@nocharge/auth/types").Session["session"] | null;
  clientIP: string;
};

type HonoContext = {
  Bindings: Bindings;
  Variables: Variables;
};

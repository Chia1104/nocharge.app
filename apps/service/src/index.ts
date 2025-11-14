import { serve } from "@hono/node-server";

import bootstrap from "@/bootstrap";
import dbFactory from "@/factories/db.factory";

export const app = dbFactory.createApp();

const port = Number(process.env.PORT) || 3001;

bootstrap(app, port);

serve({
  fetch: app.fetch,
  port,
});

import * as healthRoutes from "./routes/health.route";
import { baseOS } from "./utils";

export const router = baseOS.router({
  health: {
    server: healthRoutes.healthRoute,
    client: healthRoutes.protectedHealthRoute,
  },
});

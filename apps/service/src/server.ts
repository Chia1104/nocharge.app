import bootstrap from "@/bootstrap";
import dbFactory from "@/factories/db.factory";

const app = dbFactory.createApp();

const port = Number(process.env.PORT) || 3001;

bootstrap(app, port);

export default app;

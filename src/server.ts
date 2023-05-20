import { Application } from 'oak/mod.ts';


import router from "./router.ts";
import logger from "./middleware/logger.ts";
import errorHandler from "./middleware/errorHandler.ts";

const app = new Application();
app.use(logger);
app.use(errorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

const port = Deno.env.get("PORT") || "8000";

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port: parseInt(port) });

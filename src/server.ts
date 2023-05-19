// @ts-ignore
import { Application } from "https://deno.land/x/oak/mod.ts";
// @ts-ignore
import router from "./router.ts";
// @ts-ignore
import logger from "./middleware/logger.ts";
// @ts-ignore
import errorHandler from "./middleware/errorHandler.ts";

const app = new Application();
app.use(logger);
app.use(errorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

// @ts-ignore
const port = Deno.env.get("PORT") || "8000";

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });

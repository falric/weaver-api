import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  // This will throw a 404 error because the requested resource does not exist
  ctx.throw(404, "Resource not found");
});

// Define an error-handling middleware function that returns a custom error message for 404 errors
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 404) {
      ctx.response.status = 404;
      ctx.response.body = "Sorry, the requested resource was not found";
    } else {
      throw err;
    }
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server started on http://localhost:8000");
await app.listen({ port: 8000 });
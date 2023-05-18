// @ts-ignore
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

// Define a middleware function that logs the request method and URL
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

// Middleware function to check for authentication token
const authMiddleware = async (ctx: any, next: any) => {
  const authHeader = ctx.request.headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = "Unauthorized";
    return;
  }
  // Check that the token is mysecrettoken, authHeader will be 'Bearer mysecrettoken'
  const token = authHeader.split(" ")[1];
  if (token !== "mysecrettoken") {
    ctx.response.status = 401;
    ctx.response.body = "Unauthorized";
    return;
  }
  await next();
};

// Use the authorization middleware function for a specific route
router.get("/api/protected", authMiddleware, (ctx) => {
  ctx.response.body = "This is a protected route";
});

// Define a route that returns a JSON response
router.get("/api/users", (ctx) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = { users: [{ name: "John" }, { name: "Jane" }] };
});

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
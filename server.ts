// @ts-ignore
import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// ====== Logger middleware ======

// Define a middleware function that logs the request method and URL
const logger = async (ctx: any, next: any) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
}
  
// ====== Error handler middleware ======

const errorHandler = async (ctx: any, next: any) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    if (err.status === 404) {
      ctx.response.status = 404;
      ctx.response.body = "Sorry, the requested resource was not found";
    } else {
      ctx.response.status = 500;
      ctx.response.body = "Internal Server Error";
    }
  }
};

// ====== Authorization Middleware ======

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

// ====== Routes ======

const router = new Router();

// Use the authorization middleware function for a specific route
router.get("/api/protected", authMiddleware, (ctx: any) => {
  ctx.response.body = "This is a protected route";
});

// Define a route that returns a JSON response
router.get("/api/users", (ctx: any) => {
  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = { users: [{ name: "John" }, { name: "Jane" }] };
});

router.get("/", (ctx: any) => {
  // This will throw a 404 error because the requested resource does not exist
  ctx.throw(404, "Resource not found");
});

const app = new Application();
app.use(logger);
app.use(errorHandler);

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server started on http://localhost:8000");
await app.listen({ port: 8000 });
// @ts-ignore
import { Router } from "https://deno.land/x/oak/mod.ts";
// @ts-ignore
import authMiddleware from "./middleware/authorization.ts";

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

export default router;

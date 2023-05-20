import { Context, Next } from 'oak/mod.ts';

const logger = async (ctx: Context, next: Next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
}

export default logger;

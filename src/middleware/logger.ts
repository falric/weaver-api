const logger = async (ctx: any, next: any) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
}

export default logger;

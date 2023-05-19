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

export default errorHandler;

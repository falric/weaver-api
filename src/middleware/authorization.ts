import { Context, Next } from 'oak/mod.ts';

const authorization = async (ctx: Context, next: Next) => {
	const authHeader = ctx.request.headers.get('Authorization');
	if (!authHeader) {
		ctx.response.status = 401;
		ctx.response.body = 'Unauthorized';
		return;
	}
	// Check that the token is mysecrettoken, authHeader will be 'Bearer mysecrettoken'
	const token = authHeader.split(' ')[1];
	if (token !== 'mysecrettoken') {
		ctx.response.status = 401;
		ctx.response.body = 'Unauthorized';
		return;
	}
	await next();
};

export default authorization;

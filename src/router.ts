import { Context, Router } from 'oak/mod.ts';

import authMiddleware from './middleware/authorization.ts';
import {
	createUser,
	deleteUser,
	readAllUsers,
	readUser,
	updateUser,
} from './routes/users.ts';

const router = new Router();

// Use the authorization middleware function for a specific route
router.get('/api/protected', authMiddleware, (ctx: Context) => {
	ctx.response.body = 'This is a protected route';
});

router.put('/api/user/:userId', createUser);
router.get('/api/user/:userId', readUser);
router.post('/api/user/:userId', updateUser);
router.delete('/api/user/:userId', deleteUser);
router.get('/api/users', readAllUsers);

router.get('/', (ctx: Context) => {
	// This will throw a 404 error because the requested resource does not exist
	ctx.throw(404, 'Resource not found');
});

export default router;

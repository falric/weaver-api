import { assertEquals } from 'testing/asserts';
import { testing } from 'oak/mod.ts';
import { readAllUsers } from './users.ts';

Deno.test('readAllUsers should return all users', () => {
	const ctx = testing.createMockContext({});

	const expectedUsers = [
		{ userId: 1, name: 'John' },
		{ userId: 2, name: 'Jane' },
	];
	const expectedResponse = {
		users: expectedUsers,
	};

	readAllUsers(ctx);

	assertEquals(ctx.response.headers.get('Content-Type'), 'application/json');
	assertEquals(ctx.response.body, expectedResponse);
});

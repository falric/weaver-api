import { Context, helpers } from 'oak/mod.ts';

interface User {
  userId: number;
  name: string;
}

const testData: User[] = [
  { userId: 1, name: "John" },
  { userId: 2, name: "Jane" },
];

const getTestUser = (userId: number): User | null => testData.find((user) => user.userId === userId) || null;

const readUser = (ctx: Context<{ userId: string }>) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  console.log(`getUser ${userId}`);

  // Get user from database...
  const user = getTestUser(parseInt(userId, 10));
  if (!user) {
    ctx.throw(404, "User not found");
  }

  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = { user };
};

const createUser = async (ctx: Context<{ userId: string }>) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  const { name } = await ctx.request.body().value;
  console.log(`createUser ${userId} with name ${name}`);

  // Create user in database...
  if (!userId) {
    ctx.throw(400, "Bad Request");
  }
  testData.push({ userId: parseInt(userId, 10), name });

  ctx.response.status = 201;
}

const updateUser = async (ctx: Context<{ userId: string }>) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  const { name } = await ctx.request.body().value;
  console.log(`updateUser ${userId} with name ${name}`);

  // Update user in database...
  if (!userId) {
    ctx.throw(400, "Bad Request");
  }
  const user = getTestUser(parseInt(userId, 10));
  if (!user) {
    ctx.throw(404, "User not found");
  } else {
    user.name = name;
  }

  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = { user };
}

const deleteUser = (ctx: Context<{ userId: string }>) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true });
  console.log(`deleteUser ${userId}`);

  // Delete user from database...
  if (!userId) {
    ctx.throw(400, "Bad Request");
  }
  const user = getTestUser(parseInt(userId, 10));
  if (!user) {
    ctx.throw(404, "User not found");
  } else {
    testData.splice(testData.indexOf(user), 1);
  }

  ctx.response.status = 204;
}

const readAllUsers = (ctx: Context) => {
  console.log(`getAllUsers`);

  // Get all users from database...
  const users = testData;

  ctx.response.headers.set("Content-Type", "application/json");
  ctx.response.body = { users };
};

export { createUser, readUser, updateUser, deleteUser, readAllUsers };

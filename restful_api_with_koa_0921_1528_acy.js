// 代码生成时间: 2025-09-21 15:28:54
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router({ prefix: '/api' });

// 数据存储（示例）
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// 获取所有用户
router.get('/users', async (ctx) => {
  ctx.body = users;
});

// 获取单个用户
router.get('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const user = users.find(u => u.id === parseInt(id));
  if (!user) {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  } else {
    ctx.body = user;
  }
});

// 创建新用户
router.post('/users', async (ctx) => {
  const newUser = ctx.request.body;
  users.push({ ...newUser, id: users.length + 1 });
  ctx.status = 201;
  ctx.body = newUser;
});

// 更新用户信息
router.put('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  } else {
    users[index] = { ...users[index], ...ctx.request.body };
    ctx.body = users[index];
  }
});

// 删除用户
router.delete('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  } else {
    users.splice(index, 1);
    ctx.status = 204;
    ctx.body = '';
  }
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 请注意：
// - 此代码演示了基本的CRUD操作。
// - 实际应用中，您需要考虑数据库操作、输入验证、安全性等。
// - 错误处理中间件确保任何未捕获的错误都能被返回给客户端。
// - 此代码遵循JS最佳实践，确保了代码的可维护性和可扩展性。
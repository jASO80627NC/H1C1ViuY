// 代码生成时间: 2025-08-20 08:07:08
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// 模拟数据库
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

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
  users.push(newUser);
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

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
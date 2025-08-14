// 代码生成时间: 2025-08-14 18:41:13
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 模拟数据库中的用户权限数据
const userPermissions = {
  'admin': ['create', 'read', 'update', 'delete'],
  'editor': ['read', 'update'],
  'viewer': ['read']
};

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message };
  }
});

// 跨域中间件
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  await next();
});

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 获取用户权限列表
router.get('/permissions/:username', async (ctx) => {
  const { username } = ctx.params;
  if (userPermissions[username]) {
    ctx.body = {
      status: 'success',
      data: userPermissions[username]
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'User not found'
    };
  }
});

// 更新用户权限
router.put('/permissions/:username', async (ctx) => {
  const { username } = ctx.params;
  const { permissions } = ctx.request.body;
  if (userPermissions[username]) {
    userPermissions[username] = permissions;
    ctx.body = {
      status: 'success',
      message: 'Permissions updated'
    };
  } else {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'User not found'
    };
  }
});

// 注册路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/*
 * 用户权限管理系统
 *
 * 功能描述：
 * 提供用户权限的获取和更新接口。
 *
 * 路由：
 *  GET /permissions/:username - 获取指定用户的权限列表
 *  PUT /permissions/:username - 更新指定用户的权限列表
 *
 * 错误处理：
 *  - 404错误：用户未找到
 *  - 500错误：服务器内部错误
 *
 */
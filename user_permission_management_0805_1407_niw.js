// 代码生成时间: 2025-08-05 14:07:27
const Koa = require('koa');
const Router = require('koa-router');
# NOTE: 重要实现细节
const bodyParser = require('koa-bodyparser');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 模拟数据库，存储用户信息和权限
const usersDB = {
# 添加错误处理
  "1": {
    "username": "admin",
    "permissions": ["create", "read", "update", "delete"]
  },
  "2": {
    "username": "user",
    "permissions": ["read"]
  }
};

// 中间件配置
app.use(bodyParser());

// 检查用户权限的中间件
async function checkPermission(ctx, next) {
  const { username, permission } = ctx.request.query;
  if (!username || !permission) {
    ctx.status = 400;
# 添加错误处理
    ctx.body = {
      error: 'Username and permission are required'
# 改进用户体验
    };
# 扩展功能模块
    return;
  }
  const user = usersDB[username];
  if (!user || !user.permissions.includes(permission)) {
    ctx.status = 403;
    ctx.body = {
# 增强安全性
      error: 'Permission denied'
# 扩展功能模块
    };
    return;
  }
  await next();
}

// 获取用户权限
router.get('/permissions/:username', async (ctx) => {
  const username = ctx.params.username;
  const user = usersDB[username];
# NOTE: 重要实现细节
  if (!user) {
    ctx.status = 404;
    ctx.body = {
# 增强安全性
      error: 'User not found'
# 优化算法效率
    };
    return;
  }
  ctx.body = {
    permissions: user.permissions
  };
});

// 添加用户权限
router.post('/permissions/:username', checkPermission, async (ctx) => {
# 改进用户体验
  const username = ctx.params.username;
  const { permission } = ctx.request.query;
  const user = usersDB[username];
  if (user.permissions.includes(permission)) {
# FIXME: 处理边界情况
    ctx.status = 400;
    ctx.body = {
      error: 'Permission already exists'
# 优化算法效率
    };
    return;
  }
  user.permissions.push(permission);
  ctx.status = 201;
# 改进用户体验
  ctx.body = {
    message: 'Permission added successfully'
# TODO: 优化性能
  };
});
# 增强安全性

// 删除用户权限
router.delete('/permissions/:username', checkPermission, async (ctx) => {
  const username = ctx.params.username;
  const { permission } = ctx.request.query;
  const user = usersDB[username];
  const index = user.permissions.indexOf(permission);
  if (index === -1) {
    ctx.status = 400;
    ctx.body = {
      error: 'Permission not found'
    };
    return;
  }
  user.permissions.splice(index, 1);
  ctx.status = 204;
  ctx.body = null;
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = process.env.PORT || 3000;
# 增强安全性
app.listen(PORT, () => {
# 优化算法效率
  console.log(`Server running on http://localhost:${PORT}`);
});

// 以下是代码说明：
# TODO: 优化性能
// 此程序使用Koa框架创建了一个简单的用户权限管理系统。
// 它提供了获取用户权限、添加用户权限和删除用户权限的API。
// 为了保持代码的清晰性和易于理解，每个API都有一个对应的路由处理函数。
// 我们还添加了一个中间件来检查用户是否有执行特定操作的权限。
// 错误处理是通过设置不同的HTTP状态码来实现的，例如400表示请求无效，403表示权限拒绝。
// 代码遵循JS最佳实践，包括使用async/await和中间件模式。
// 数据库是模拟的，实际应用中应该替换为真实的数据库。
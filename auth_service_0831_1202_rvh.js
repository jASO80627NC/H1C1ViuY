// 代码生成时间: 2025-08-31 12:02:00
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 模拟数据库中的用户信息
const users = {
  'user1': {
    username: 'user1',
    password: 'password1',
    isAdmin: false
  },
  'user2': {
    username: 'user2',
    password: 'password2',
    isAdmin: true
  }
};

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 中间件：解析请求体
app.use(bodyParser());

// 用户身份验证中间件
async function authenticate(ctx, next) {
  const { username, password } = ctx.request.body;
  
  // 检查用户名和密码是否存在于“数据库”中
  const user = users[username];
  if (!user || user.password !== password) {
    // 如果认证失败，返回错误响应
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication failed.'
    };
    return;
  }
  
  // 如果认证成功，继续处理请求
  await next();
}

// 登录路由
router.post('/login', authenticate, async ctx => {
  const { username } = ctx.request.body;
  const user = users[username];
  
  // 返回用户信息
  ctx.body = {
    message: 'Logged in successfully.',
    user: {
      username: user.username,
      isAdmin: user.isAdmin
    }
  };
});

// 注册路由
router.post('/register', async ctx => {
  const { username, password, isAdmin } = ctx.request.body;
  
  // 简单的用户名检查
  if (users[username]) {
    ctx.status = 409; // Conflict
    ctx.body = {
      message: 'Username already exists.'
    };
    return;
  }
  
  // 添加新用户到“数据库”
  users[username] = { username, password, isAdmin };
  ctx.status = 201;
  ctx.body = {
    message: 'User registered successfully.',
    user: {
      username: username,
      isAdmin: isAdmin
    }
  };
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 以下是代码注释和文档：

// auth_service.js 提供用户身份验证功能
//
// 功能概述：
// - 提供/login和/register路由用于用户登录和注册
// - 使用authenticate中间件进行身份验证
// - 登录成功后返回用户信息
// - 注册新用户前检查用户名是否存在
//
// 注意：
// - 这里的用户存储和验证逻辑非常基础，实际应用中应使用数据库和加密密码
// - 身份验证失败时返回401状态码
// - 注册冲突时返回409状态码

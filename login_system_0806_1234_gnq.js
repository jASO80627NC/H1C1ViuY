// 代码生成时间: 2025-08-06 12:34:34
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 模拟数据库中的用户数据
const userDB = {
  'admin': {
    username: 'admin',
    password: 'password123' // 注意：实际生产中密码应该加密存储
  }
};

// 创建Koa实例
const app = new Koa();

// 使用bodyParser中间件解析请求体
app.use(bodyParser());

// 创建路由
const router = new Router();

// 登录路由
router.post('/login', async (ctx) => {
  try {
    // 从请求体中获取用户名和密码
    const { username, password } = ctx.request.body;

    // 验证用户名和密码
    if (userDB[username] && userDB[username].password === password) {
      // 登录成功，设置用户身份信息
      ctx.body = {
        success: true,
        message: 'Login successful',
        user: userDB[username]
      };
      ctx.status = 200;
    } else {
      // 登录失败，返回错误信息
      ctx.body = {
        success: false,
        message: 'Invalid username or password'
      };
      ctx.status = 401;
    }
  } catch (error) {
    // 错误处理
    ctx.body = {
      success: false,
      message: 'An error occurred during login',
      error: error.message
    };
    ctx.status = 500;
  }
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
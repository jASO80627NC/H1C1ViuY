// 代码生成时间: 2025-08-03 00:01:58
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 假设有一个简单的用户数据存储
const users = {
  'user1': 'password1'
};

// 创建一个Koa应用
const app = new Koa();

// 创建一个Router实例
const router = new Router();

// 使用bodyParser中间件来解析请求体
app.use(bodyParser());

// 登录接口
router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;
  
  // 检查用户名和密码是否匹配
  if (users[username] && users[username] === password) {
    ctx.status = 200;
    ctx.body = {
      message: 'Login successful',
      username: username
    };
  } else {
    // 返回401状态码表示认证失败
    ctx.status = 401;
    ctx.body = {
      message: 'Login failed: Invalid username or password'
    };
  }
});

// 注册接口
router.post('/register', async (ctx) => {
  const { username, password } = ctx.request.body;
  
  // 检查用户名是否已经存在
  if (users[username]) {
    ctx.status = 409;
    ctx.body = {
      message: 'Registration failed: Username already exists'
    };
  } else {
    // 存储新用户
    users[username] = password;
    ctx.status = 201;
    ctx.body = {
      message: 'User registered successfully',
      username: username
    };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 设置监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 错误处理中间件
app.on('error', (err, ctx) => {
  console.error('Server error', err, ctx);
});

// 注释和文档说明：
// 这个简单的用户身份认证服务提供了登录和注册两个接口。
// 登录接口接受用户名和密码，验证成功后返回成功消息和用户名，否则返回错误消息。
// 注册接口检查用户名是否已存在，如果不存在则添加新用户并返回成功消息。
// 该服务易于扩展，比如可以添加更多的用户验证逻辑，或者集成到更复杂的认证系统中。
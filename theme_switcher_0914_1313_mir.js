// 代码生成时间: 2025-09-14 13:13:12
const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

// 创建一个Koa实例
const app = new Koa();

// 设置session中间件
app.keys = ['some secret key'];
app.use(session(app));

// 设置body解析中间件
app.use(bodyParser());

// 创建路由
const router = new Router();

// 定义主题存储键
const THEME_KEY = 'theme';

// 设置主题切换路由
router.post('/api/set-theme', async (ctx) => {
  // 从请求体中获取主题
  const { theme } = ctx.request.body;
  
  // 验证主题
  if (!theme || ['light', 'dark'].indexOf(theme) === -1) {
    // 如果主题无效，返回错误信息
    ctx.status = 400;
    ctx.body = 'Invalid theme';
    return;
  }

  // 设置用户会话中的主题
  ctx.session[THEME_KEY] = theme;
  
  // 返回成功响应
  ctx.body = 'Theme set to ' + theme;
});

// 获取当前主题路由
router.get('/api/get-theme', async (ctx) => {
  // 从会话中获取主题
  const theme = ctx.session[THEME_KEY];
  
  // 如果会话中没有主题，则默认为'light'
  if (!theme) {
    ctx.session[THEME_KEY] = 'light';
    theme = 'light';
  }
  
  // 返回当前主题
  ctx.body = theme;
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 记录错误
    console.error('server error', err);
    // 设置响应状态码和错误信息
    ctx.status = err.status || 500;
    ctx.body = 'server error';
  }
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
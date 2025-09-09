// 代码生成时间: 2025-09-09 22:35:17
const Koa = require('koa');
const Router = require('koa-router');

// 使用 koa-bodyparser 进行 body 解析
const bodyParser = require('koa-bodyparser');

// 引入 xss 过滤库
const sanitizeHtml = require('sanitize-html');

const app = new Koa();
const router = new Router();

// 配置中间件，解析 request body
app.use(bodyParser());

// 定义中间件进行 XSS 过滤
function xssFilter(ctx, next) {
  return next().then(() => {
    // 过滤 ctx.request.body 里所有的数据
    const filteredBody = sanitizeHtml(ctx.request.body, {
      allowedTags: [], // 不允许任何标签，可以根据需要自定义白名单
      allowedAttributes: {}, // 不允许任何属性，可以根据需要自定义白名单
    });
    // 将过滤后的数据重新赋值给 ctx.request.body
    ctx.request.body = filteredBody;
  });
}

// 添加路由，并应用 XSS 过滤中间件
router.post('/api/data', xssFilter, async (ctx) => {
  try {
    // 这里可以添加业务逻辑处理请求
    // 由于已经过滤了 XSS，可以放心处理 ctx.request.body 中的数据
    ctx.body = {
      message: 'Data received and sanitized',
      receivedData: ctx.request.body
    };
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
    console.error(error);
  }
});

// 启动服务器
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// 注意：实际生产环境中需要根据业务需求自定义 sanitizeHtml 的配置，
// 包括允许的标签和属性等。这里为了演示目的，禁用了所有标签和属性。

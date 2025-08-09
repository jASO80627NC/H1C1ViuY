// 代码生成时间: 2025-08-10 01:05:27
const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios'); // 用于发送HTTP请求

// 创建Koa应用
const app = new Koa();
const router = new Router();

// URL有效性验证中间件
async function validateUrl(ctx, next) {
  try {
    // 从请求中获取URL
    const url = ctx.request.query.url;
    // 验证URL格式
    if (!url) {
      ctx.status = 400;
      ctx.body = {"error": "URL parameter is missing"};
      return;
    }
    const { status } = await axios.head(url); // 发送HEAD请求检查URL是否有效
    if (status === 200) {
      ctx.body = {"message": "URL is valid"};
    } else {
      ctx.status = 400;
      ctx.body = {"error": "URL is invalid"};
    }
  } catch (error) {
    // 处理异常
    ctx.status = 500;
    ctx.body = {"error": "An error occurred while validating URL"};
  }
}

// 路由设置
router.get('/validate', validateUrl);

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
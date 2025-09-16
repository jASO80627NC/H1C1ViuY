// 代码生成时间: 2025-09-17 00:45:32
const Koa = require('koa');
const Router = require('koa-router');

// 创建一个Koa应用
const app = new Koa();
// 使用Router中间件
const router = new Router();

// 一个简单的数学计算工具集
class MathCalculator {
  // 加法
  static add(a, b) {
    return a + b;
  }

  // 减法
  static subtract(a, b) {
    return a - b;
  }

  // 乘法
  static multiply(a, b) {
    return a * b;
  }

  // 除法
  static divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero.');
    }
    return a / b;
  }
}

// 实现不同的数学计算路由
router.get('/add/:a/:b', async (ctx) => {
  const a = parseFloat(ctx.params.a);
  const b = parseFloat(ctx.params.b);
  ctx.body = { result: MathCalculator.add(a, b) };
});

router.get('/subtract/:a/:b', async (ctx) => {
  const a = parseFloat(ctx.params.a);
  const b = parseFloat(ctx.params.b);
  ctx.body = { result: MathCalculator.subtract(a, b) };
});

router.get('/multiply/:a/:b', async (ctx) => {
  const a = parseFloat(ctx.params.a);
  const b = parseFloat(ctx.params.b);
  ctx.body = { result: MathCalculator.multiply(a, b) };
});

router.get('/divide/:a/:b', async (ctx) => {
  const a = parseFloat(ctx.params.a);
  const b = parseFloat(ctx.params.b);
  try {
    ctx.body = { result: MathCalculator.divide(a, b) };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Math calculator app listening at http://localhost:${port}`);
});

// 文档/注释
// 该应用程序提供了一个简单的数学计算工具集，
// 包括加法、减法、乘法和除法运算。
// 它使用Koa框架和Router中间件来处理HTTP请求。
// 代码生成时间: 2025-08-03 09:24:29
const Router = require('koa-router');
const router = new Router();

// 创建一个数学计算工具类
class MathTool {
  // 加法
  add(a, b) {
    return a + b;
  }

  // 减法
  subtract(a, b) {
    return a - b;
  }

  // 乘法
  multiply(a, b) {
    return a * b;
  }

  // 除法
  divide(a, b) {
    if (b === 0) {
      throw new Error('Divide by zero error');
    }
    return a / b;
  }
}

// 实例化MathTool类
const mathTool = new MathTool();

// 定义路由
router.get('/add/:a/:b', async (ctx) => {
  try {
    const result = mathTool.add(parseFloat(ctx.params.a), parseFloat(ctx.params.b));
    ctx.body = {
      result: result,
      operation: 'add'
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: 'Invalid input for addition',
      message: error.message
    };
  }
});

router.get('/subtract/:a/:b', async (ctx) => {
  try {
    const result = mathTool.subtract(parseFloat(ctx.params.a), parseFloat(ctx.params.b));
    ctx.body = {
      result: result,
      operation: 'subtract'
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: 'Invalid input for subtraction',
      message: error.message
    };
  }
});

router.get('/multiply/:a/:b', async (ctx) => {
  try {
    const result = mathTool.multiply(parseFloat(ctx.params.a), parseFloat(ctx.params.b));
    ctx.body = {
      result: result,
      operation: 'multiply'
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: 'Invalid input for multiplication',
      message: error.message
    };
  }
});

router.get('/divide/:a/:b', async (ctx) => {
  try {
    const result = mathTool.divide(parseFloat(ctx.params.a), parseFloat(ctx.params.b));
    ctx.body = {
      result: result,
      operation: 'divide'
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: 'Invalid input for division',
      message: error.message
    };
  }
});

// 导出router
module.exports = router;
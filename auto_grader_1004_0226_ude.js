// 代码生成时间: 2025-10-04 02:26:22
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// 创建一个新的 Koa 应用程序
const app = new Koa();
const router = new Router();

// 使用 body parser 中间件来解析请求体
app.use(bodyParser());

// 自动批改工具的配置
const gradingConfig = {
  problems: {
    '1': {
      expectedOutput: 'Hello, World!',
      testInput: 'console.log("Hello, World!");'
    },
    '2': {
      expectedOutput: '10',
      testInput: 'let sum = 0; for (let i = 1; i <= 5; i++) sum += i; console.log(sum);'
    }
  }
};

// 批改一个单独的问题
function gradeProblem(problemId, code) {
  try {
    const problem = gradingConfig.problems[problemId];
    if (!problem) {
      throw new Error('Problem not found');
    }

    const testScript = new (require('vm').Script)(problem.testInput);
    const context = {
      console: {
        log: (msg) => {
          if (msg !== problem.expectedOutput) {
            throw new Error('Test failed: Expected output does not match');
          }
        }
      }
    };
    testScript.runInNewContext(context);
    return { success: true, message: 'Graded successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// POST请求处理器，用于接收代码并批改
router.post('/grade', async (ctx) => {
  try {
    const { problemId, code } = ctx.request.body;
    const result = gradeProblem(problemId, code);
    ctx.status = 200;
    ctx.body = result;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { success: false, message: 'Internal server error' };
  }
});

// 将路由应用到应用程序
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Auto Grader server listening on port ${PORT}`);
});
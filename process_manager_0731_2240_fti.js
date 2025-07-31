// 代码生成时间: 2025-07-31 22:40:37
const Koa = require('koa');
const Router = require('koa-router');
const { exec } = require('child_process');

// 创建Koa应用实例
const app = new Koa();
const router = new Router();

// 定义一个函数来执行shell命令
function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout);
      }
    });
  });
}

// 定义一个获取进程列表的路由
router.get('/processes', async (ctx) => {
  try {
    // 使用shell命令'ps'获取进程列表
    const processes = await runCommand('ps aux');
    // 将进程列表发送给客户端
    ctx.body = processes;
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = 'Error fetching processes';
  }
});

// 将路由添加到Koa应用
app.use(router.routes()).use(router.allowedMethods());

// 监听端口3000
app.listen(3000, () => {
  console.log('Process Manager server running on port 3000');
});
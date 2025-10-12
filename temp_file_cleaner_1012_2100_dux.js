// 代码生成时间: 2025-10-12 21:00:42
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 临时文件清理工具
async function cleanTempFiles(directory) {
  try {
    // 读取目录中的文件
    const files = await fs.promises.readdir(directory);
    for (const file of files) {
      const filePath = path.join(directory, file);
      // 检查是否为文件
      const stats = await fs.promises.stat(filePath);
      if (stats.isFile()) {
        // 删除文件
        await fs.promises.unlink(filePath);
        console.log(`Deleted temp file: ${filePath}`);
      }
    }
  } catch (error) {
    console.error('Error cleaning temp files:', error);
    throw error;
  }
}

// 定义清理临时文件的路由
router.get('/clean-temp-files', async (ctx) => {
  try {
    // 设置临时文件夹路径
    const tempDirectory = './temp';
    // 调用清理函数
    await cleanTempFiles(tempDirectory);
    ctx.body = {
      message: 'Temp files cleaned successfully'
    };
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = {
      error: 'Failed to clean temp files'
    };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动Koa应用
const port = 3000;
app.listen(port, () => {
  console.log(`Temp file cleaner app listening on port ${port}`);
});

// 注释和文档
/*
 * Temp File Cleaner Service
 *
 * This service provides a simple API to clean up temporary files in a specified directory.
 *
 * @author Your Name
 * @date 2023-04-20
 */

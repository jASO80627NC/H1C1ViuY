// 代码生成时间: 2025-09-24 09:42:03
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // 需要安装sharp库来处理图片

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 处理图片尺寸批量调整的函数
async function resizeImages(inputPath, outputPath, targetSize) {
  try {
    const files = fs.readdirSync(inputPath);
    for (const file of files) {
      const filePath = path.join(inputPath, file);
      const outputPathWithFile = path.join(outputPath, file);
      await sharp(filePath).resize(targetSize).toFile(outputPathWithFile);
    }
  } catch (error) {
    console.error('Error resizing images:', error);
    throw error;
  }
}

// 定义路由，用于启动批量调整尺寸的操作
router.post('/resize-images', async (ctx) => {
  const { inputPath, outputPath, targetSize } = ctx.request.body; // 从请求体中获取路径和尺寸
  if (!inputPath || !outputPath || !targetSize) {
    ctx.status = 400;
    ctx.body = { error: 'Missing required parameters' };
    return;
  }
  if (typeof targetSize !== 'number') {
    ctx.status = 400;
    ctx.body = { error: 'Target size must be a number' };
    return;
  }
  try {
    await resizeImages(inputPath, outputPath, targetSize);
    ctx.status = 200;
    ctx.body = { message: 'Images resized successfully' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to resize images', error: error.message };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 设置监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 请注意，此代码需要在服务器上运行，并且用户需要有权限访问指定的文件夹路径。
// 此外，sharp库需要在项目中安装。
// 代码生成时间: 2025-09-08 18:42:18
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs').promises;
const Jimp = require('jimp'); // 需要安装Jimp库

// 创建Koa实例
const app = new Koa();
const router = new Router();
# 增强安全性

// 路由处理函数，用于接收图片尺寸调整请求
router.post('/resize-image', async (ctx) => {
  try {
    // 获取请求中的图片文件
    const imageFile = ctx.request.files.image;
# NOTE: 重要实现细节
    // 获取目标尺寸
    const targetWidth = ctx.request.body.width;
# 优化算法效率
    const targetHeight = ctx.request.body.height;

    // 检查文件和尺寸参数是否有效
    if (!imageFile) {
      throw new Error('No image file provided.');
    }
    if (targetWidth <= 0 || targetHeight <= 0) {
      throw new Error('Invalid dimensions provided.');
    }

    // 使用Jimp库读取图片文件
    const image = await Jimp.read(imageFile.path);
    // 调整图片尺寸
    await image.resize(targetWidth, targetHeight);

    // 设置响应头，返回调整后的图片
    ctx.type = 'image/jpeg';
    ctx.body = await image.getBufferAsync(Jimp.MIME_JPEG);
# 改进用户体验
  } catch (error) {
    // 错误处理
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
# 扩展功能模块
});

// 将路由绑定到Koa实例
app.use(router.routes()).use(router.allowedMethods());

// 监听端口，启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Image Resizer Server running on http://localhost:${port}`);
});
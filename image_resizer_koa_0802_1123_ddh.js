// 代码生成时间: 2025-08-02 11:23:28
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 路由：处理图片尺寸批量调整请求
router.post('/resize-images', async (ctx) => {
  // 获取请求体中的图片路径和目标尺寸
  const { imagePaths, targetWidth, targetHeight } = ctx.request.body;
  
  // 验证输入参数
  if (!imagePaths || !targetWidth || !targetHeight) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid input' };
    return;
  }
  
  // 批量调整图片尺寸
  try {
    const resizedImagePaths = await Promise.all(imagePaths.map(async (imagePath) => {
      // 读取图片文件
      const imageBuffer = await sharp(imagePath)
        .resize({ width: targetWidth, height: targetHeight })
        .toBuffer();
      
      // 保存调整后的图片
      const targetPath = path.join('resized', path.basename(imagePath));
      await fs.promises.writeFile(targetPath, imageBuffer);
      
      return targetPath;
    }));
    
    // 返回成功响应
    ctx.status = 200;
    ctx.body = { resizedImagePaths };
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = { error: 'Failed to resize images' };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
app.listen(3000, () => {
  console.log('Image Resizer is running on port 3000');
});

// 代码注释：
// 这是一个简单的KOA应用程序，用于批量调整图片尺寸。
// 它使用'sharp'库来处理图片尺寸调整，并使用'fs'库来保存调整后的图片。
// 应用程序提供了一个POST路由'/resize-images'，用于接收图片路径和目标尺寸。
// 请求体应包含'imagePaths'（图片路径数组）、'targetWidth'和'targetHeight'（目标尺寸）。
// 如果输入参数有效，应用程序将调整图片尺寸并返回调整后的图片路径数组。
// 如果发生错误，应用程序将返回错误信息。
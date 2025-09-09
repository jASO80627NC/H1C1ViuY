// 代码生成时间: 2025-09-10 05:43:44
const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs').promises;
const { createGunzip } = require('zlib');
const { createWriteStream } = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// 创建 Koa 实例
const app = new Koa();
const router = new Router();

// 定义路由：GET /decompress
router.get('/decompress', async (ctx) => {
  // 解析请求参数
  const { filePath, outputDir } = ctx.query;
  if (!filePath || !outputDir) {
    ctx.status = 400;
    ctx.body = 'Missing required query parameters: filePath and outputDir';
    return;
  }
  
  try {
    // 验证文件路径和输出目录是否合法
    const fileStats = await fs.stat(filePath);
    if (!fileStats.isFile()) {
      throw new Error('Provided filePath is not a file');
    }
    
    const outputStats = await fs.stat(outputDir);
    if (!outputStats.isDirectory()) {
      throw new Error('Provided outputDir is not a directory');
    }
    
    // 创建解压输出路径
    const outputPath = path.join(outputDir, path.basename(filePath, path.extname(filePath)));
    
    // 使用 pipeline 进行解压
    await pipeline(
      fs.createReadStream(filePath),
      createGunzip(),
      createWriteStream(outputPath)
    );
    
    ctx.body = {
      message: 'File decompressed successfully',
      outputPath
    };
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = {
      message: 'An error occurred during decompression',
      error: error.message
    };
  }
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 服务器监听端口
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 注释：
// 这个 Koa 应用提供了一个简单的 API 端点，用于解压上传的压缩文件。
// 用户可以通过 GET 请求到 /decompress 端点并提供文件路径和输出目录作为查询参数。
// 服务会解压文件并将解压后的文件保存在指定目录。
// 错误处理已经包含在内，如果有任何问题，会返回相应的状态码和错误信息。
// 代码生成时间: 2025-08-15 01:09:40
const Koa = require('koa');
const Router = require('koa-router');
const fs = require('fs');
# 改进用户体验
const path = require('path');

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 文件重命名函数
async function renameFiles(dir, newNamePattern) {
  const files = fs.readdirSync(dir);
# 优化算法效率
  for (const fileName of files) {
    const oldPath = path.join(dir, fileName);
    const stats = fs.statSync(oldPath);
    if (stats.isFile()) {
      const ext = path.extname(fileName);
      const newName = `${newNamePattern}-${Date.now()}${ext}`;
      const newPath = path.join(dir, newName);
      fs.renameSync(oldPath, newPath);
      console.log(`Renamed ${oldPath} to ${newPath}`);
    }
  }
}

// 定义API路由
router.post('/rename', async (ctx) => {
  const { dir, newNamePattern } = ctx.request.body;
  if (!dir || !newNamePattern) {
    ctx.status = 400;
    ctx.body = 'Directory and new name pattern are required';
    return;
  }

  try {
    await renameFiles(dir, newNamePattern);
    ctx.status = 200;
    ctx.body = 'Files renamed successfully';
# NOTE: 重要实现细节
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Error renaming files';
    console.error(error);
  }
});

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 应用监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 以下是代码注释说明
# 添加错误处理
/**
 * @function renameFiles
# 优化算法效率
 * 批量重命名指定目录下的所有文件
 * @param {string} dir - 文件夹路径
 * @param {string} newNamePattern - 新文件名模式
 */

/**
 * @function Koa app setup
 * 设置Koa应用和路由
 */
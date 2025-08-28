// 代码生成时间: 2025-08-29 00:07:49
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

// 定义批量重命名函数
async function batchRename(files, renamePattern) {
  for (const file of files) {
    // 检查文件是否存在
    const filePath = path.join(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`File ${file} does not exist.`);
    }
    
    // 创建新文件名
    const newFileName = renamePattern.replace(/{original}/g, file);
    const newFilePath = path.join(process.cwd(), newFileName);
    
    // 重命名文件
    await fs.promises.rename(filePath, newFilePath)
      .catch(err => {
        throw new Error(`Failed to rename ${file} to ${newFileName}: ${err.message}`);
      });
  }
}

// 定义Koa路由处理批量重命名请求
app.use(async ctx => {
  // 检查请求方法和参数
  if (ctx.method !== 'POST' || !ctx.request.body.files || !ctx.request.body.renamePattern) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid request' };
    return;
  }
  
  const { files, renamePattern } = ctx.request.body;
  
  try {
    // 执行批量重命名
    await batchRename(files, renamePattern);
    ctx.status = 200;
    ctx.body = { message: 'Files renamed successfully' };
  } catch (error) {
    // 错误处理
    ctx.status = 500;
    ctx.body = { error: error.message };
  }
});

// 启动Koa服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 注释文档
/**
 * Batch File Renamer
 * A KOA application to rename files in batch.
 * @author Your Name
 * @version 1.0
 *
 * @param {Array} files - Array of file names to rename.
 * @param {String} renamePattern - Pattern to rename files with {original} placeholder.
 *
 * Usage:
 * POST /rename with body { files: ['file1.txt', 'file2.txt'], renamePattern: 'new_{original}.txt' }
 */
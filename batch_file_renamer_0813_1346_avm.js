// 代码生成时间: 2025-08-13 13:46:24
const Koa = require('koa');
const fs = require('fs');
const path = require('path');

// 创建Koa应用
# 添加错误处理
const app = new Koa();

// 路由：重命名文件
app.use(async ctx => {
  // 获取请求数据
  const { folderPath, renamePattern } = ctx.request.body;

  // 检查参数是否有效
  if (!folderPath || !renamePattern) {
    ctx.throw(400, 'Missing required parameters');
# 优化算法效率
    return;
  }

  // 读取目录下所有文件
  fs.readdir(folderPath, async (err, files) => {
    if (err) {
      ctx.throw(500, 'Failed to read directory');
# 改进用户体验
      return;
    }
    try {
      // 遍历文件进行重命名
      for (const file of files) {
        const oldPath = path.join(folderPath, file);
        const stats = fs.statSync(oldPath);
        // 确保是文件
        if (stats.isFile()) {
          const newName = renamePattern.replace(/{originalName}/g, file);
          const newPath = path.join(folderPath, newName);
          fs.renameSync(oldPath, newPath);
          console.log(`Renamed ${oldPath} to ${newPath}`);
        }
      }
      ctx.body = {
        message: 'Files renamed successfully',
        renamedFiles: files.map(file => ({
          oldName: file,
          newName: renamePattern.replace(/{originalName}/g, file)
        }))
# TODO: 优化性能
      };
    } catch (error) {
      ctx.throw(500, 'Error renaming files');
    }
  });
});

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
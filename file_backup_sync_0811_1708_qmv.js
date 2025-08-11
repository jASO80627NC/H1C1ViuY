// 代码生成时间: 2025-08-11 17:08:22
const Koa = require('koa');
const fs = require('fs').promises;
const path = require('path');
const app = new Koa();

// 定义备份文件的函数
async function backupFile(source, destination) {
  try {
    // 读取源文件内容
    const data = await fs.readFile(source, 'utf8');
    // 确保目标目录存在
    await fs.mkdir(path.dirname(destination), { recursive: true });
    // 写入目标文件
    await fs.writeFile(destination, data);
    console.log(`File backed up from ${source} to ${destination}`);
  } catch (error) {
    console.error('Error backing up file:', error);
    throw error;
  }
}

// 定义同步文件的函数
async function syncFiles(source, destination) {
  try {
    // 读取源文件和目标文件的修改时间
    const sourceStats = await fs.stat(source);
    const destinationStats = await fs.stat(destination);
    
    if (sourceStats.mtimeMs > destinationStats.mtimeMs) {
      // 如果源文件较新，则备份文件
      await backupFile(source, destination);
    } else {
      console.log('No need to sync. Destination file is up-to-date.');
    }
  } catch (error) {
    if (error.code === 'ENOENT') {
      // 如果目标文件不存在，则视为全新文件，执行备份
      await backupFile(source, destination);
    } else {
      console.error('Error syncing files:', error);
      throw error;
    }
  }
}

// 设置路由和中间件来处理备份和同步请求
app.use(async (ctx) => {
  const { source, destination } = ctx.request.query;
  if (!source || !destination) {
    ctx.status = 400;
    ctx.body = 'Source and destination parameters are required';
    return;
  }
  
  try {
    // 根据请求类型执行备份或同步操作
    if (ctx.path === '/backup') {
      await backupFile(source, destination);
      ctx.body = `Backup successful. File backed up from ${source} to ${destination}`;
    } else if (ctx.path === '/sync') {
      await syncFiles(source, destination);
      ctx.body = `Sync successful. Checked file sync from ${source} to ${destination}`;
    } else {
      ctx.status = 404;
      ctx.body = 'Not Found';
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = `Internal Server Error: ${error.message}`;
  }
});

// 监听端口启动服务
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
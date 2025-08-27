// 代码生成时间: 2025-08-27 08:32:03
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// 文件备份和同步工具
class FileBackupSyncTool {
  constructor(sourcePath, destinationPath) {
    this.sourcePath = sourcePath;
    this.destinationPath = destinationPath;
  }

  // 同步文件
  syncFiles() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.sourcePath, (err, files) => {
        if (err) {
          reject(err);
          return;
        }

        let copyTasks = files.map(file => {
          const source = path.join(this.sourcePath, file);
          const destination = path.join(this.destinationPath, file);
          return this.copyFile(source, destination);
        });

        Promise.all(copyTasks)
          .then(() => resolve())
          .catch(reject);
      });
    });
  }

  // 复制文件
  copyFile(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);
    return new Promise((resolve, reject) => {
      readStream.pipe(writeStream);
      writeStream.on('error', reject);
      writeStream.on('finish', resolve);
    });
  }
}

// 创建文件备份和同步工具实例
const backupSyncTool = new FileBackupSyncTool('./source', './destination');

// 定义备份和同步路由
router.get('/backup-sync', async ctx => {
  try {
    await backupSyncTool.syncFiles();
    ctx.body = 'Files synced successfully';
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to sync files', message: err.message };
  }
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 代码生成时间: 2025-09-22 13:23:55
const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 定义文件夹结构整理器
class FolderStructureOrganizer {
  #sourceDir;
  #targetDir;
  #fileTypes;

  constructor(sourceDir, targetDir, fileTypes) {
    this.#sourceDir = sourceDir;
    this.#targetDir = targetDir;
    this.#fileTypes = fileTypes;
  }

  // 递归遍历文件夹
  async *listFiles(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
      const entry = path.join(dir, d.name);
      if (d.isDirectory()) {
        yield* this.listFiles(entry);
      } else if (this.#fileTypes.includes(path.extname(d.name))) {
        yield entry;
      }
    }
  }

  // 整理文件夹结构
  async organize() {
    try {
      const files = [];
      for await (const file of this.listFiles(this.#sourceDir)) {
        files.push(file);
      }

      for (const file of files) {
        const relativePath = path.relative(this.#sourceDir, file);
        const targetPath = path.join(this.#targetDir, relativePath);
        const targetDir = path.dirname(targetPath);

        // 确保目标文件夹存在
        await fs.promises.mkdir(targetDir, { recursive: true });

        // 移动文件
        await fs.promises.rename(file, targetPath);
      }

      console.log('Folder structure organized successfully.');
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  }
}

// 路由处理
router.post('/organize', async (ctx) => {
  const { sourceDir, targetDir, fileTypes } = ctx.request.body;
  const organizer = new FolderStructureOrganizer(sourceDir, targetDir, fileTypes);
  await organizer.organize();
  ctx.status = 200;
  ctx.body = 'Folder structure organized successfully.';
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 以下是代码注释和文档
/*
 * 文件夹结构整理器
 *
 * 这个程序使用KOA框架创建了一个服务，可以整理指定文件夹结构。
 * 它递归遍历源目录，将特定类型的文件移动到目标目录。
 *
 * @author Your Name
 * @version 1.0.0
 *
 * 用法：
 * curl -X POST http://localhost:3000/organize -H "Content-Type: application/json" -d '{"sourceDir": "/path/to/source", "targetDir": "/path/to/target", "fileTypes": [".js", ".json"]}'
 *
 * 错误处理：
 * - 如果源目录或目标目录不存在，程序将抛出错误。
 * - 如果文件移动过程中出现错误，程序将记录错误消息。
 *
 * 可维护性和可扩展性：
 * - 程序结构清晰，易于理解。
 * - 可以通过添加更多的文件类型或扩展文件处理逻辑来扩展程序。
 *
 */
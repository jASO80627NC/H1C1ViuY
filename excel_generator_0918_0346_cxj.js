// 代码生成时间: 2025-09-18 03:46:04
const Koa = require('koa');
const Router = require('koa-router');
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

// 创建一个Koa实例
const app = new Koa();
const router = new Router();

// 定义生成Excel表格的函数
function generateExcel(data, filename) {
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(data), 'Sheet1');
  XLSX.writeFile(workbook, filename);
}

// 定义路由处理函数
router.post('/generate-excel', async (ctx) => {
  try {
    // 验证请求中的文件
    const files = ctx.request.files;
    if (!files || Object.keys(files).length === 0) {
      throw new Error('No file uploaded.');
    }

    const file = files.file;
    if (!file.name.endsWith('.xlsx')) {
      throw new Error('File is not a valid Excel file.');
    }

    // 读取文件并解析数据
    const buffer = await file.toBuffer();
    const workbook = XLSX.read(buffer, {type: 'buffer'});
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

    // 生成新的Excel文件
    const newFilename = `generated_${Date.now()}.xlsx`;
    generateExcel(data, path.join(__dirname, 'public', newFilename));

    // 设置响应头和文件路径
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    ctx.set('Content-Disposition', `attachment; filename=${newFilename}`);
    ctx.body = fs.createReadStream(path.join(__dirname, 'public', newFilename));
  } catch (error) {
    // 错误处理
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 设置静态文件目录
app.use(require('koa-static')(path.join(__dirname, 'public')));

// 监听端口启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 代码注释：
// 该程序使用Koa框架创建一个简单的Excel表格自动生成器。
// 用户通过POST请求上传Excel文件，服务器解析文件内容，
// 并生成一个新的Excel文件作为响应。
// 程序包含了错误处理和适当的注释，以确保代码的可读性和可维护性。
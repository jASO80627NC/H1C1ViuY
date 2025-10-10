// 代码生成时间: 2025-10-10 19:14:09
const Koa = require('koa');
const Router = require('koa-router');
const ExcelBuilder = require('excel-builder');
const path = require('path');
const fs = require('fs');

// 创建 Koa 应用
const app = new Koa();
const router = new Router();

// 路由处理生成 Excel 文件
router.get('/generate-excel', async (ctx) => {
    try {
        // 创建 Excel 工作簿
        const workbook = new ExcelBuilder.Workbook();

        // 添加工作表
        const sheet = workbook.addWorksheet('My Sheet');

        // 填充数据
        sheet.setDataAt(0, 0, 'Name');
        sheet.setDataAt(0, 1, 'Age');
        sheet.setDataAt(0, 2, 'City');

        // 示例数据
        const data = [
            ['John', 30, 'New York'],
            ['Doe', 25, 'Los Angeles'],
            ['Smith', 40, 'Chicago']
        ];

        // 将数据写入工作表
        data.forEach((row, index) => {
            sheet.setDataAt(index + 1, 0, row[0]);
            sheet.setDataAt(index + 1, 1, row[1]);
            sheet.setDataAt(index + 1, 2, row[2]);
        });

        // 写入文件系统
        const filename = 'GeneratedExcel.xlsx';
        const filePath = path.join(__dirname, filename);
        await workbook.saveAsync(filePath);

        // 设置响应头
        ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        ctx.set('Content-Disposition', `attachment; filename=${filename}`);

        // 发送文件给客户端
        ctx.body = fs.createReadStream(filePath);
    } catch (error) {
        // 错误处理
        ctx.status = 500;
        ctx.body = 'Error generating Excel file';
        console.error(error);
    }
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Excel Generator is running on http://localhost:${PORT}`);
});

// 以下是代码的注释和文档

/**
 * @file excel_generator_with_koa.js
 * @description A Koa application that generates Excel files.
 *
 * @author Your Name
 * @version 1.0
 * @date 2023-04-01
 */
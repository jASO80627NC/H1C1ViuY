// 代码生成时间: 2025-09-14 23:13:41
const Koa = require('koa');
const fs = require('fs');
const path = require('path');

// 日志解析工具类
class LogParser {
  // 构造函数接收日志文件路径
  constructor(logFilePath) {
    this.logFilePath = logFilePath;
  }

  // 解析日志文件
  parseLogs() {
    try {
      // 读取日志文件内容
      const logData = fs.readFileSync(this.logFilePath, 'utf-8');
      // 按行分割日志内容
      const logLines = logData.split('
');
      // 定义解析规则
      const parseRules = {
        error: /Error: (.*)/,
        warning: /Warning: (.*)/,
        info: /Info: (.*)/
      };
      // 解析日志行并按类型分类
      return logLines.reduce((accumulator, line) => {
        Object.keys(parseRules).forEach((rule) => {
          const match = line.match(parseRules[rule]);
          if (match) {
            accumulator[rule] = accumulator[rule] || [];
            accumulator[rule].push(match[1]);
          }
        });
        return accumulator;
      }, {});
    } catch (error) {
      // 错误处理
      console.error('Error parsing log file:', error);
      throw error;
    }
  }
}

// Koa应用实例
const app = new Koa();

// 路由：解析日志文件
app.use(async (ctx) => {
  // 获取日志文件路径参数
  const logFilePath = ctx.query.logFilePath;
  // 验证文件路径
  if (!logFilePath) {
    ctx.status = 400;
    ctx.body = 'Log file path is required';
    return;
  }
  if (!path.isAbsolute(logFilePath)) {
    ctx.status = 400;
    ctx.body = 'Log file path must be absolute';
    return;
  }
  // 创建日志解析工具实例
  const logParser = new LogParser(logFilePath);
  // 解析日志文件
  const parsedLogs = logParser.parseLogs();
  // 将解析结果发送给客户端
  ctx.body = parsedLogs;
});

// 监听端口启动服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Log parser tool is running on port ${PORT}`);
});
// 代码生成时间: 2025-10-10 00:00:25
const Koa = require('koa');
const Router = require('koa-router');
const MongoClient = require('mongodb').MongoClient;

// 配置数据库连接
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'monitor_tool';

// 创建Koa应用
const app = new Koa();
const router = new Router();

// 状态码和消息响应函数
function respond(res, status, message) {
  return res.status(status).json({ status, message });
}

// 获取数据库连接
function getDBConnection() {
  const client = new MongoClient(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  return client.connect().then((conn) => {
    return conn.db(DB_NAME);
  }).catch((err) => {
    console.error('Database connection error:', err);
    throw err;
  });
}

// 监控数据库状态
router.get('/db-status', async (ctx) => {
  try {
    const db = await getDBConnection();
    const serverStatus = await db.command({ buildInfo: 1 });
    respond(ctx, 200, serverStatus);
  } catch (error) {
    respond(ctx, 500, 'Failed to get database status');
  }
});

// 健康检查端点
router.get('/health', ctx => {
  respond(ctx, 200, 'Database monitoring tool is running');
});

// 路由注册
app.use(router.routes()).use(router.allowedMethods());

// 服务器启动监听
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 注释：
// 1. 我们使用了Koa框架来创建一个简单的HTTP服务。
// 2. 使用MongoClient来连接MongoDB数据库，并监控其状态。
// 3. 提供了两个端点：'/db-status'用于获取数据库状态，
//    '/health'用于健康检查。
// 4. 错误处理确保了任何数据库连接问题都能被正确反馈给客户端。
// 5. 代码结构清晰，易于理解和维护。
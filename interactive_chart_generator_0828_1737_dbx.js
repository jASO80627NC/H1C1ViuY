// 代码生成时间: 2025-08-28 17:37:18
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const ChartJS = require('chart.js');

// 创建一个 Koa 应用
const app = new Koa();
const router = new Router();

// 使用 body parser 中间件来解析请求体中的 JSON
app.use(bodyParser());

// 定义一个存储图表配置的简单数据结构
const chartConfigs = {};

// 生成图表配置的路由
router.post('/create-chart', async (ctx) => {
  try {
    const { chartId, data, options } = ctx.request.body;
    if (!chartId || !data || !options) {
      throw new Error('Missing chart parameters');
    }
    // 存储图表配置
    chartConfigs[chartId] = { data, options };
    // 返回图表ID作为响应
    ctx.body = {
      status: 'success',
      chartId,
      message: 'Chart created successfully'
    };
  } catch (error) {
    // 错误处理
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

// 获取图表配置的路由
router.get('/chart/:chartId', async (ctx) => {
  const chartId = ctx.params.chartId;
  // 检查图表配置是否存在
  if (chartConfigs[chartId]) {
    ctx.body = {
      status: 'success',
      data: chartConfigs[chartId].data,
      options: chartConfigs[chartId].options,
      message: 'Chart data retrieved successfully'
    };
  } else {
    // 图表配置不存在
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'Chart not found'
    };
  }
});

// 注册路由
app.use(router.routes()).use(router.allowedMethods());

// 启动 Koa 服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Interactive Chart Generator is running on port ${PORT}`);
});

// 以下是使用 ChartJS 创建图表的示例代码，可以在客户端使用
/*
function createChart(chartId, data, options) {
  const ctx = document.getElementById(chartId).getContext('2d');
  new ChartJS(ctx, {
    type: 'line', // 或者 'bar', 'pie', 'doughnut', 等
    data: data,
    options: options
  });
}
*/

// 请注意，上述代码中包含了一个注释掉的 ChartJS 使用示例，
// 它可以在客户端 JavaScript 中被用来实际绘制图表。

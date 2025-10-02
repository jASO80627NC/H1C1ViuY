// 代码生成时间: 2025-10-03 03:18:20
const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios'); // 用于发送HTTP请求

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 模拟传感器数据接口
const SENSOR_API_URL = 'http://example.com/sensor-data';

// 获取传感器数据的中间件
async function getSensorData(ctx) {
  try {
    // 使用axios发送GET请求
    const response = await axios.get(SENSOR_API_URL);
    // 将传感器数据设置到响应体中
    ctx.body = response.data;
  } catch (error) {
    // 错误处理
    ctx.status = error.response ? error.response.status : 500;
    ctx.body = {
      error: 'Failed to fetch sensor data',
      message: error.message
    };
  }
}

// 定义路由
router.get('/sensor-data', getSensorData);

// 使用路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 监听端口
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sensor data collector is running on port ${PORT}`);
});

// 以下是模块化和可维护性的设计
// 1. 错误处理中间件可以被抽离出来，以便于复用和维护
// 2. 配置项（如API URL和端口）可以被抽离到配置文件，方便管理
// 3. 路由和中间件的分离使得代码结构更加清晰
// 4. 使用async/await语法提高代码的可读性

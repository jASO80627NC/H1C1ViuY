// 代码生成时间: 2025-09-18 23:28:26
const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 定义检查网络连接状态的函数
async function checkNetworkStatus(url) {
    try {
        // 使用axios发送请求
        const response = await axios.head(url);
        // 根据HTTP状态码判断网络连接状态
        if (response.status >= 200 && response.status < 300) {
            return { status: 'connected', message: 'Network connection is stable.' };
        } else {
            return { status: 'error', message: 'Failed to connect to the network.' };
        }
    } catch (error) {
        // 错误处理
        return { status: 'error', message: error.message || 'An unknown error occurred.' };
    }
}

// 设置路由，检查网络连接状态
router.get('/status', async (ctx) => {
    const { url } = ctx.query;
    if (!url) {
        return ctx.status = 400; // 如果没有提供URL，返回400错误
    }
    const status = await checkNetworkStatus(url);
    ctx.body = status;
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 设置监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Network status checker running on port ${PORT}`);
});

// 导出app对象以便于测试
module.exports = app;
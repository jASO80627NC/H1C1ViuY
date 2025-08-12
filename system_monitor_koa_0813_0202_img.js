// 代码生成时间: 2025-08-13 02:02:33
const Koa = require('koa');
const Router = require('koa-router');
const os = require('os');

// 创建一个新的Koa实例
const app = new Koa();
// 创建一个新的Router实例用于路由管理
const router = new Router();

// 定义获取系统信息的接口
router.get('/sysinfo', async (ctx) => {
    try {
        // 获取CPU信息
        const cpuInfo = os.cpus();
        // 获取内存信息
        const memInfo = os.totalmem();
        // 获取空闲内存信息
        const freeMemInfo = os.freemem();
        // 获取系统负载信息
        const loadavg = os.loadavg();

        // 构建系统信息对象
        const systemInfo = {
            cpu: cpuInfo,
            memoryTotal: memInfo,
            memoryFree: freeMemInfo,
            loadAverage: loadavg
        };

        // 将系统信息设置为响应体并发送
        ctx.body = systemInfo;
    } catch (error) {
        // 错误处理
        ctx.status = 500;
        ctx.body = { error: 'Failed to retrieve system information', message: error.message };
    }
});

// 使用Router实例中的路由，与Koa实例关联
app.use(router.routes());
app.use(router.allowedMethods());

// 监听3000端口
app.listen(3000, () => {
    console.log('System performance monitoring tool is running on port 3000');
});

// 程序注释：
// 这个程序是一个简单的系统性能监控工具，使用KOA框架创建。
// 它提供了一个GET接口 /sysinfo，用于获取当前系统的CPU、内存和负载信息。
// 错误处理确保了在获取系统信息失败时，能够返回合适的HTTP状态码和错误信息。
// 代码结构清晰，易于理解和维护，且遵循JS最佳实践。
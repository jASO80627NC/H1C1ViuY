// 代码生成时间: 2025-08-26 19:33:34
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();

// 数据统计分析器类
class DataAnalyzer {
    constructor() {
        this.data = [];
    }
    
    // 添加数据
    addData(data) {
        this.data.push(data);
        return `Data added: ${data}`;
    }
    
    // 获取总数据量
    getTotalDataCount() {
        return this.data.length;
    }
    
    // 获取平均值
    getAverage() {
        if (this.data.length === 0) {
            throw new Error('No data available');
        }
        const sum = this.data.reduce((acc, val) => acc + val, 0);
        return sum / this.data.length;
    }
    
    // 获取最高值
    getMax() {
        if (this.data.length === 0) {
            throw new Error('No data available');
        }
        return Math.max(...this.data);
    }
    
    // 获取最低值
    getMin() {
        if (this.data.length === 0) {
            throw new Error('No data available');
        }
        return Math.min(...this.data);
    }
}

// 实例化一个数据分析师对象
const analyzer = new DataAnalyzer();

// 路由处理
router.get('/addData/:data', async (ctx) => {
    try {
        const response = analyzer.addData(ctx.params.data);
        ctx.body = {
            status: 'success',
            message: response
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message
        };
    }
});

router.get('/totalDataCount', async (ctx) => {
    try {
        const count = analyzer.getTotalDataCount();
        ctx.body = {
            status: 'success',
            data: count
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message
        };
    }
});

router.get('/average', async (ctx) => {
    try {
        const average = analyzer.getAverage();
        ctx.body = {
            status: 'success',
            data: average
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message
        };
    }
});

router.get('/max', async (ctx) => {
    try {
        const max = analyzer.getMax();
        ctx.body = {
            status: 'success',
            data: max
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message
        };
    }
});

router.get('/min', async (ctx) => {
    try {
        const min = analyzer.getMin();
        ctx.body = {
            status: 'success',
            data: min
        };
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: error.message
        };
    }
});

// 使用路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
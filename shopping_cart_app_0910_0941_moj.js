// 代码生成时间: 2025-09-10 09:41:16
const Koa = require('koa');
const Router = require('koa-router');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 模拟数据库的购物车存储
let cartDB = {};

// 创建购物车
router.post('/cart', async (ctx) => {
    const { productId, quantity } = ctx.request.body;
    if (!productId || quantity <= 0) {
        ctx.status = 400;
        ctx.body = {
            error: 'Invalid input'
        };
        return;
    }
    cartDB[productId] = quantity;
    ctx.status = 201;
    ctx.body = {
        message: 'Product added to cart',
        cart: cartDB
    };
});

// 获取购物车
router.get('/cart', async (ctx) => {
    ctx.body = {
        cart: cartDB
    };
});

// 更新购物车
router.put('/cart/:productId', async (ctx) => {
    const { productId } = ctx.params;
    const { quantity } = ctx.request.body;
    if (!productId || quantity <= 0) {
        ctx.status = 400;
        ctx.body = {
            error: 'Invalid input'
        };
        return;
    }
    if (!cartDB[productId]) {
        ctx.status = 404;
        ctx.body = {
            error: 'Product not found in cart'
        };
        return;
    }
    cartDB[productId] = quantity;
    ctx.status = 200;
    ctx.body = {
        message: 'Product quantity updated',
        cart: cartDB
    };
});

// 删除购物车中的商品
router.delete('/cart/:productId', async (ctx) => {
    const { productId } = ctx.params;
    if (!cartDB[productId]) {
        ctx.status = 404;
        ctx.body = {
            error: 'Product not found in cart'
        };
        return;
    }
    delete cartDB[productId];
    ctx.status = 200;
    ctx.body = {
        message: 'Product removed from cart',
        cart: cartDB
    };
});

// 应用路由
app.use(router.routes()).use(router.allowedMethods());

// 设置监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
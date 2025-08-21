// 代码生成时间: 2025-08-21 10:41:38
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const crypto = require('crypto');

// 创建Koa应用
const app = new Koa();

// 使用bodyParser中间件，解析请求体
app.use(bodyParser());

// 密码加密解密工具类
class PasswordTool {
    // 加密密码
    static encryptPassword(password) {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    reject(err);
                } else {
                    const salt = buf.toString('base64');
                    const key = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512');
                    const encryptedPassword = Buffer.concat([buf, key]).toString('base64');
                    resolve({ salt, encryptedPassword });
                }
            });
        });
    }

    // 解密密码
    static decryptPassword(salt, encryptedPassword) {
        const encryptedPasswordBuffer = Buffer.from(encryptedPassword, 'base64');
        const saltBuffer = encryptedPasswordBuffer.slice(0, 16);
        const key = encryptedPasswordBuffer.slice(16, 80);
        const password = crypto.pbkdf2Sync(key, saltBuffer.toString('base64'), 10000, 64, 'sha512').toString('utf8');
        return password;
    }
}

// 加密密码接口
app.post('/encrypt', async (ctx) => {
    try {
        const { password } = ctx.request.body;
        if (!password) {
            ctx.status = 400;
            ctx.body = { error: 'Password is required' };
            return;
        }
        const { salt, encryptedPassword } = await PasswordTool.encryptPassword(password);
        ctx.body = { salt, encryptedPassword };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to encrypt password' };
    }
});

// 解密密码接口
app.post('/decrypt', async (ctx) => {
    try {
        const { salt, encryptedPassword } = ctx.request.body;
        if (!salt || !encryptedPassword) {
            ctx.status = 400;
            ctx.body = { error: 'Salt and encrypted password are required' };
            return;
        }
        const password = await PasswordTool.decryptPassword(salt, encryptedPassword);
        ctx.body = { password };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { error: 'Failed to decrypt password' };
    }
});

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Password encrypt/decrypt tool running on port ${PORT}`);
});
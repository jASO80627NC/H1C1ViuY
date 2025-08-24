// 代码生成时间: 2025-08-24 10:05:33
// password_encrypt_decrypt_koa.js
// This Koa application provides a simple password encryption and decryption tool.
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const crypto = require('crypto');

// Initialize the Koa application
const app = new Koa();
const router = new Router();

// Use body parser middleware to parse JSON request bodies
app.use(bodyParser());

// Password encryption function
function encryptPassword(password, secretKey) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encrypted = cipher.update(password, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    return encrypted;
}

// Password decryption function
function decryptPassword(encryptedPassword, secretKey) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8')
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Route to encrypt a password
router.post('/encrypt', async (ctx) => {
    try {
        const { password, secretKey } = ctx.request.body;
        if (!password || !secretKey) {
            ctx.status = 400;
            ctx.body = 'Password and secret key are required';
            return;
        }
        const encrypted = encryptPassword(password, secretKey);
        ctx.status = 200;
        ctx.body = { encrypted };
    } catch (error) {
        ctx.status = 500;
        ctx.body = 'Error encrypting password';
    }
});

// Route to decrypt a password
router.post('/decrypt', async (ctx) => {
    try {
        const { encryptedPassword, secretKey } = ctx.request.body;
        if (!encryptedPassword || !secretKey) {
            ctx.status = 400;
            ctx.body = 'Encrypted password and secret key are required';
            return;
        }
        const decrypted = decryptPassword(encryptedPassword, secretKey);
        ctx.status = 200;
        ctx.body = { decrypted };
    } catch (error) {
        ctx.status = 500;
        ctx.body = 'Error decrypting password';
    }
});

// Add routes to the Koa application
app.use(router.routes()).use(router.allowedMethods());

// Start the Koa application
const port = 3000;
app.listen(port, () => {
    console.log(`Password encryption and decryption server is running on port ${port}`);
});
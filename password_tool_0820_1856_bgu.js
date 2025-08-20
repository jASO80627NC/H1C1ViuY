// 代码生成时间: 2025-08-20 18:56:02
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const crypto = require('crypto');

// Initialize Koa and Router
const app = new Koa();
const router = new Router();

// Middleware for parsing request bodies
app.use(bodyParser());

// Secret key for encryption and decryption
const SECRET_KEY = 'your-secure-key';

// Function to encrypt a password using AES-256-CBC
function encryptPassword(password) {
  const cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Function to decrypt a password using AES-256-CBC
function decryptPassword(encryptedPassword) {
  const decipher = crypto.createDecipher('aes-256-cbc', SECRET_KEY);
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// API endpoint to encrypt a password
router.post('/encrypt', async (ctx) => {
  try {
    const { password } = ctx.request.body;
    if (!password) {
      throw new Error('Password is required');
    }
    const encrypted = encryptPassword(password);
    ctx.body = {
      status: 'success',
      encryptedPassword: encrypted
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

// API endpoint to decrypt a password
router.post('/decrypt', async (ctx) => {
  try {
    const { encryptedPassword } = ctx.request.body;
    if (!encryptedPassword) {
      throw new Error('Encrypted password is required');
    }
    const decrypted = decryptPassword(encryptedPassword);
    ctx.body = {
      status: 'success',
      decryptedPassword: decrypted
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: error.message
    };
  }
});

// Use the router
app.use(router.routes());
app.use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
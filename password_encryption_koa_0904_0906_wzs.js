// 代码生成时间: 2025-09-04 09:06:00
const Koa = require('koa');
const Router = require('koa-router');
const crypto = require('crypto');

// 创建Koa实例
const app = new Koa();
const router = new Router();

// 密码加密解密工具
// 使用crypto模块，以AES算法进行加密和解密
class PasswordUtils {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  // 加密方法
  encrypt(text) {
    const cipher = crypto.createCipher('aes-256-cbc', this.secretKey);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  // 解密方法
  decrypt(encryptedText) {
    const decipher = crypto.createDecipher('aes-256-cbc', this.secretKey);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

// 实例化密码工具，使用固定密钥
const passwordUtils = new PasswordUtils('your-secret-key');

// 加密接口
router.post('/api/encrypt', async (ctx) => {
  try {
    const { text } = ctx.request.body;
    if (!text) {
      throw new Error('Text to encrypt is required.');
    }
    const encryptedText = passwordUtils.encrypt(text);
    ctx.body = {
      success: true,
      data: {
        text: text,
        encryptedText: encryptedText
      }
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: error.message
    };
  }
});

// 解密接口
router.post('/api/decrypt', async (ctx) => {
  try {
    const { encryptedText } = ctx.request.body;
    if (!encryptedText) {
      throw new Error('Encrypted text to decrypt is required.');
    }
    const decryptedText = passwordUtils.decrypt(encryptedText);
    ctx.body = {
      success: true,
      data: {
        encryptedText: encryptedText,
        decryptedText: decryptedText
      }
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      message: error.message
    };
  }
});

// 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
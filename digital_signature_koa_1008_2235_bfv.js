// 代码生成时间: 2025-10-08 22:35:50
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { generateKeyPairSync, sign, verify } = require('crypto');

// 创建一个新的Koa实例
const app = new Koa();

// 使用bodyParser中间件来解析请求体
app.use(bodyParser());

// 定义一个简单的错误处理函数
function handleError(err, ctx) {
  ctx.status = err.status || 500;
  ctx.body = { error: err.message };
}

// 数字签名工具的路由处理
app.use(async ctx => {
  const { data, keyType } = ctx.request.body;
  if (!data || !keyType) {
    handleError(new Error('Missing data or key type'), ctx);
    return;
  }
  
  // 根据keyType生成密钥对
  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
  
  // 对data进行签名
  const signature = sign(data, privateKey);
  
  // 设置响应体为签名结果和公钥
  ctx.body = {
    signature: signature.toString('base64'),
    publicKey: publicKey.toString('base64')
  };
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    handleError(err, ctx);
  }
});

// 启动Koa服务器
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 以下是代码注释说明：

// * 我们使用Koa框架来创建一个简单的HTTP服务器。
// * bodyParser中间件用于解析请求体。
// * crypto模块用于生成密钥对和数字签名。
// * 我们定义了一个路由来处理数字签名的请求。
// * 我们检查请求体中是否包含必要的数据和密钥类型。
// * 根据密钥类型，我们生成RSA密钥对。
// * 使用私钥对数据进行签名。
// * 将签名结果和公钥以Base64编码的形式返回给客户端。
// * 我们添加了一个错误处理中间件来捕获和处理可能发生的错误。
// * 最后，我们启动服务器并监听3000端口。

// 代码生成时间: 2025-09-16 17:51:04
const Koa = require('koa');
const fs = require('fs');
const path = require('path');

// 创建Koa实例
const app = new Koa();

// 配置文件路径
const configPath = './config.json';

// 读取配置文件的函数
async function readConfig() {
  try {
    const data = await fs.promises.readFile(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // 错误处理
    console.error('Failed to read config file:', error);
    throw error;
  }
}

// 写入配置文件的函数
async function writeConfig(config) {
  try {
    const data = JSON.stringify(config, null, 2);
    await fs.promises.writeFile(configPath, data, 'utf8');
  } catch (error) {
    // 错误处理
    console.error('Failed to write config file:', error);
    throw error;
  }
}

// 获取配置的路由
app.get('/api/config', async (ctx) => {
  const config = await readConfig();
  ctx.body = config;
});

// 更新配置的路由
app.put('/api/config', async (ctx) => {
  const newConfig = ctx.request.body;
  const currentConfig = await readConfig();
  const updatedConfig = { ...currentConfig, ...newConfig };
  await writeConfig(updatedConfig);
  ctx.body = updatedConfig;
});

// 监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = {
      message: error.message || 'Internal Server Error'
    };
  }
});

// 确保配置文件存在，如果不存在则创建一个默认配置文件
if (!fs.existsSync(configPath)) {
  const defaultConfig = {
    database: {
      host: 'localhost',
      port: 5432,
      user: 'user',
      password: 'password'
    },
    server: {
      port: 3000
    }
  };
  writeConfig(defaultConfig).catch(console.error);
}


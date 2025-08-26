// 代码生成时间: 2025-08-26 08:31:58
const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Initialize a new Koa application
const app = new Koa();

/**
 * Load configuration file from the given path.
 * @param {string} filePath - The path to the YAML configuration file.
 * @returns {Object} The loaded configuration object.
 */
function loadConfig(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return yaml.load(fileContent);
  } catch (error) {
    throw new Error(`Failed to load configuration from ${filePath}: ${error.message}`);
  }
}

/**
 * Get configuration endpoint.
 * Returns the loaded configuration.
 * @param {string} req - The incoming request object.
 * @param {Object} res - The response object.
 */
app.use(async (ctx) => {
  const configPath = path.join(__dirname, 'config.yml');
  const config = loadConfig(configPath);
  ctx.body = config;
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Config Manager is running on port ${PORT}`);
});

// Export the application for testing purposes
module.exports = app;
// 代码生成时间: 2025-09-18 08:29:31
 * Features:
 * - Error handling
 * - Clear code structure
 * - Proper comments and documentation for maintainability and extensibility
 */

const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cheerio = require('cheerio');

// Create a new Koa instance
const app = new Koa();
const router = new Router();

// Route to fetch webpage content
router.get('/scrape', async (ctx) => {
  // URL to scrape
  const url = ctx.query.url;
  
  // Error handling for URL
  if (!url) {
    ctx.status = 400;
    ctx.body = { error: 'URL parameter is required' };
    return;
  }
  
  try {
    // Use axios to make HTTP request to the URL
    const response = await axios.get(url);
    const html = response.data;
    
    // Use cheerio to parse HTML and extract content
    const $ = cheerio.load(html);
    const content = $('body').html();
    
    // Send the extracted content back to the client
    ctx.body = { content: content };
  } catch (error) {
    // Handle errors and send error response
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch content' };
  }
});

// Add the router to the Koa app
app.use(router.routes());
app.use(router.allowedMethods());

// Start the Koa server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Web Scraper server listening on port ${PORT}`);
});
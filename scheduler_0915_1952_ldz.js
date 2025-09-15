// 代码生成时间: 2025-09-15 19:52:39
const Koa = require('koa');
const Router = require('koa-router');
const schedule = require('node-schedule');

// Create a Koa application instance
const app = new Koa();
const router = new Router();

// Function to handle tasks
function handleTask() {
  console.log('Task is running...');
  // Add your task logic here
}

// Schedule the task to run every hour
const job = schedule.scheduleJob('0 * * * *', handleTask);

// Routes
router.get('/start-scheduler', async (ctx) => {
  ctx.body = 'Scheduler started';
  job; // Start the scheduled job
});

router.get('/stop-scheduler', async (ctx) => {
  if (job) {
    job.cancel();
    ctx.body = 'Scheduler stopped';
  } else {
    ctx.status = 404;
    ctx.body = 'Scheduler not found';
  }
});

// Applying routes to the Koa app
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
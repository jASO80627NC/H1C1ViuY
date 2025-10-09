// 代码生成时间: 2025-10-10 03:12:42
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

// Mock database for course content
const courses = [];

// Initialize the Koa application
const app = new Koa();

// Initialize the router
const router = new Router();

// Body parser middleware to parse request bodies
app.use(bodyParser());

// Helper function to generate unique course ID
function generateCourseId() {
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
}

// POST endpoint to create a new course
router.post('/api/courses', async (ctx) => {
  try {
    const { title, description } = ctx.request.body;
    if (!title || !description) {
      throw new Error('Title and description are required.');
    }
    const course = { id: generateCourseId(), title, description };
    courses.push(course);
    ctx.status = 201;
    ctx.body = course;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: error.message };
  }
});

// GET endpoint to retrieve all courses
router.get('/api/courses', async (ctx) => {
  ctx.body = courses;
});

// GET endpoint to retrieve a single course by ID
router.get('/api/courses/:id', async (ctx) => {
  const course = courses.find(c => c.id === ctx.params.id);
  if (!course) {
    ctx.status = 404;
    ctx.body = { error: 'Course not found.' };
  } else {
    ctx.body = course;
  }
});

// PUT endpoint to update an existing course
router.put('/api/courses/:id', async (ctx) => {
  const { title, description } = ctx.request.body;
  const course = courses.find(c => c.id === ctx.params.id);

  if (!course) {
    ctx.status = 404;
    ctx.body = { error: 'Course not found.' };
  } else {
    course.title = title;
    course.description = description;
    ctx.body = course;
  }
});

// DELETE endpoint to delete a course
router.delete('/api/courses/:id', async (ctx) => {
  const courseIndex = courses.findIndex(c => c.id === ctx.params.id);
  if (courseIndex === -1) {
    ctx.status = 404;
    ctx.body = { error: 'Course not found.' };
  } else {
    courses.splice(courseIndex, 1);
    ctx.status = 204;
    ctx.body = '';
  }
});

// Apply routes to the Koa application
app.use(router.routes()).use(router.allowedMethods());

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Course Content Management API is running on port ${PORT}`);
});
// 代码生成时间: 2025-09-01 00:35:46
const Koa = require('koa');
const Router = require('koa-router');

// Function to validate required fields in the form
function validateRequiredFields(body, fields) {
  const errors = [];
  fields.forEach(field => {
    if (!body[field] || body[field].trim() === '') {
      errors.push(`The field '${field}' is required.`);
    }
  });
  return errors;
}

// Function to validate email format
function validateEmail(email) {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email);
}

// Create a new Koa application
const app = new Koa();

// Create a new router
const router = new Router();

// Define the POST route for form submission
router.post('/submit-form', async (ctx) => {
  try {
    // Get the form data from the request body
    const { name, email } = ctx.request.body;

    // Validate the required fields
    const errors = validateRequiredFields(ctx.request.body, ['name', 'email']);

    // Check if there are any errors
    if (errors.length > 0) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'Validation errors occurred.',
        errors: errors
      };
      return;
    }

    // Validate the email format
    if (!validateEmail(email)) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        message: 'Invalid email format.',
        errors: ['The email provided is not in a valid format.']
      };
      return;
    }

    // If all validations pass, proceed with the form submission logic
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'Form submitted successfully.',
      data: ctx.request.body
    };
  } catch (error) {
    // Handle any unexpected errors
    ctx.status = 500;
    ctx.body = {
      success: false,
      message: 'An error occurred while processing the form submission.',
      error: error.message
    };
  }
});

// Use the router middleware
app.use(router.routes()).use(router.allowedMethods());

// Start the Koa server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
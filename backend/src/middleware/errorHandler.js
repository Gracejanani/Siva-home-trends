/**
 * Global Express error-handler middleware.
 * Must be registered AFTER all routes and other middleware.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  // Log the full error for server-side debugging
  console.error(`[Error] ${req.method} ${req.originalUrl}`, err);

  // Determine HTTP status code
  let statusCode = err.statusCode || err.status || 500;

  // Map well-known error codes / names to sensible HTTP statuses
  if (err.name === 'UnauthorizedError' || err.message?.toLowerCase().includes('unauthorized')) {
    statusCode = 401;
  } else if (err.name === 'ForbiddenError' || err.message?.toLowerCase().includes('forbidden')) {
    statusCode = 403;
  } else if (err.name === 'NotFoundError' || err.message?.toLowerCase().includes('not found')) {
    statusCode = 404;
  } else if (err.name === 'ValidationError' || err.name === 'BadRequestError') {
    statusCode = 400;
  }

  // Build response body
  const response = {
    success: false,
    error: statusCode < 500
      ? (err.message || 'Bad request')
      : 'An unexpected server error occurred. Please try again later.',
  };

  // Expose stack trace only in development
  if (process.env.NODE_ENV === 'development' && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

module.exports = errorHandler;

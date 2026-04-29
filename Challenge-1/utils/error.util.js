const unauthorizedError = (message) => {
  const error = new Error(message);
  error.name = 'UnauthorizedError';
  throw error;
};

const forbiddenError = (message) => {
  const error = new Error(message);
  error.name = 'ForbiddenError';
  throw error;
};

const notFoundError = (message) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

module.exports = { unauthorizedError, forbiddenError, notFoundError };

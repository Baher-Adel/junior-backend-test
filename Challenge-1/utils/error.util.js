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

module.exports = { unauthorizedError, forbiddenError };
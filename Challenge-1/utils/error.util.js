const unauthorizedError = (message) => { 
  const error = new Error(message);
  error.name = 'UnauthorizedError';
  throw error;
};

module.exports = { unauthorizedError };
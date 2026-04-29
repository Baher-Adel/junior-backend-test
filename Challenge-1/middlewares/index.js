const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.name = 'NotFoundError';
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ errors: err.errors });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ errors: 'Unauthorized' });
  }
  if (res.name === 'NotFoundError') {
    return res.status(404).json({ message: 'Not Found' });
  }
  next(err);
};

module.exports = { validateRequest, errorHandler };

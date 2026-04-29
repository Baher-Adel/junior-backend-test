const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ errors: err.errors });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ errors: 'Unauthorized' });
  }
  next(err);
};

module.exports = { validateRequest, errorHandler };

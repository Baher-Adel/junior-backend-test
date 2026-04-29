const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { unauthorizedError, forbiddenError, notFoundError } = require('../utils/error.util');
const mongoose = require('mongoose');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) notFoundError('Not Found');
  next();
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer ')) unauthorizedError('Unauthorized');

  const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
  if (!decoded) unauthorizedError('Unauthorized');

  req.user = decoded;
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') forbiddenError('Forbidden');
  next();
};

const notFound = (req, res, next) => {
  notFoundError(`Not Found - ${req.originalUrl}`);
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ errors: err.errors });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ errors: 'Unauthorized' });
  }
  if (err.name === 'NotFoundError') {
    return res.status(404).json({ errors: 'Not Found' });
  }
  if (err.name === 'ForbiddenError') {
    return res.status(403).json({ errors: 'Forbidden' });
  }
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ errors: 'Unauthorized' });
  }
  if(err.name === 'SyntaxError') {
    return res.status(400).json({ errors: 'Invalid JSON' });
  }
  next(err);
};

module.exports = {
  validateRequest,
  authenticate,
  isAdmin,
  notFound,
  errorHandler,
  validateObjectId,
};

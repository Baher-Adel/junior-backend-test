const { Router } = require('express');
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controllers/product.controller');
const { createProductValidator } = require('../validators/product.validate');
const {
  validateRequest,
  authenticate,
  isAdmin,
  validateObjectId,
} = require('../middlewares');

const router = Router();

router.post(
  '/',
  authenticate,
  isAdmin,
  createProductValidator,
  validateRequest,
  create
);
router.get('/', authenticate, getAll);
router.get('/:id', authenticate, validateObjectId, getById);
router.put(
  '/:id',
  authenticate,
  isAdmin,
  validateObjectId,
  createProductValidator,
  validateRequest,
  update
);
router.delete('/:id', authenticate, validateObjectId, isAdmin, remove);

module.exports = router;

const { Router } = require('express');
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controllers/product.controller');
const { createProductValidator } = require('../validators/product.validate');
const { validateRequest, authenticate, isAdmin } = require('../middlewares');

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
router.get('/:id', authenticate, getById);
router.put(
  '/:id',
  authenticate,
  createProductValidator,
  validateRequest,
  isAdmin,
  update
);
router.delete('/:id', authenticate, isAdmin, remove);

module.exports = router;

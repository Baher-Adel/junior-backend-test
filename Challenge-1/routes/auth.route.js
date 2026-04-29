const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth.validate');
const { validateRequest } = require('../middlewares');

const router = Router();

router.post('/login', loginValidator, validateRequest, login);

module.exports = router;

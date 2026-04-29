const { loginUser } = require('../services/auth.service');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await loginUser(email, password);
  res.status(200).json({ token });
};

module.exports = { login };

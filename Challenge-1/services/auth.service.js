const User = require('../models/user');
const { comparePassword } = require('../utils/hash.util');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new Error('Invalid email or password');

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) throw new Error('Invalid email or password');

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
};

module.exports = { loginUser };

const bcrypt = require('bcrypt');

const parsedRounds = parseInt(process.env.SALT_ROUNDS, 10);
const SALT_ROUNDS =
  Number.isFinite(parsedRounds) && parsedRounds > 0 ? parsedRounds : 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword,
};

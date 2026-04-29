/* eslint-disable no-console */
require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/user');
const { hashPassword } = require('../utils/hash.util');

const MONGODB_URI = process.env.MONGODB_URI;

const SEED_USERS = [
  {
    email: 'admin@inventory.test',
    passwordPlain: 'AdminPass1!',
    role: 'admin',
  },
  {
    email: 'user@inventory.test',
    passwordPlain: 'UserPass1!',
    role: 'user',
  },
];

async function seed() {
  if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI in environment (.env).');
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const { email, passwordPlain, role } of SEED_USERS) {
    const password = await hashPassword(passwordPlain);
    await User.findOneAndUpdate(
      { email },
      { email, password, role },
      { upsert: true, setDefaultsOnInsert: true }
    );
    console.log(`Seeded account: ${email} (${role})`);
  }

  console.log('Done. Default passwords are in scripts/seed.js (SEED_USERS).');
}

seed()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
  });

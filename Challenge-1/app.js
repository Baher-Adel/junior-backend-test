require('dotenv').config();

const express = require('express');
const authRoute = require('./routes/auth.route');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoute);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console -- startup log
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;

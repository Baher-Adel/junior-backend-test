require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console -- startup log
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;

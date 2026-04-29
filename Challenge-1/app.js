require('dotenv').config();

const express = require('express');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const { errorHandler, notFound } = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoute);
app.use('/products', productRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console -- startup log
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;

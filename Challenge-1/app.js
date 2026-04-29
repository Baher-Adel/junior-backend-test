require('dotenv').config();

const express = require('express');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/product.route');
const { errorHandler, notFound } = require('./middlewares');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => await mongoose.connect(MONGODB_URI);
connectDB()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
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

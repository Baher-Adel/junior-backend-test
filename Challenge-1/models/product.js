const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator(v) {
          return typeof v === 'number' && v > 0;
        },
        message: 'Price must be a positive number',
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity must be non-negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);

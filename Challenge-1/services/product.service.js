const Product = require('../models/product');
const { notFoundError } = require('../utils/error.util');

const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
}

const getAllProducts = async (page = 0, limit = 10) => {
  const products = await Product.find().skip(page * limit).limit(limit);
  return products;
}

const getProductById = async (id) => { 
  const product = await Product.findById(id);
  if(!product) notFoundError('Product not found');
  return product;
}

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, { new: true });
  if(!product) notFoundError('Product not found');
  return product;
}

const removeProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if(!product) notFoundError('Product not found');
  return product;
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, removeProduct };
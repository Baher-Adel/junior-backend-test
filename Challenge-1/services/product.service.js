const Product = require('../models/product');

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
  if(!product) throw new Error('Product not found');
  return product;
}

const updateProduct = async (id, productData) => {
  const product = await Product.findByIdAndUpdate(id, productData, { new: true });
  if(!product) throw new Error('Product not found');
  return product;
}

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if(!product) throw new Error('Product not found');
  return product;
}
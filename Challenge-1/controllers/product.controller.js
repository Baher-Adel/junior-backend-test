const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  removeProduct,
} = require('../services/product.service');

const create = async (req, res) => {
  const { name, category, price, quantity } = req.body;
  const product = await createProduct({ name, category, price, quantity });
  res.status(201).json(product);
};

const getAll = async (req, res) => {
  const { page = 0, limit = 10 } = req.query;
  const products = await getAllProducts(page, limit);
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  res.status(200).json(product);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, quantity } = req.body;
  const product = await updateProduct(id, { name, category, price, quantity });
  res.status(200).json(product);
};

const remove = async (req, res) => {
  const { id } = req.params;
  await removeProduct(id);
  res.status(204).send();
};

module.exports = { create, getAll, getById, update, remove };

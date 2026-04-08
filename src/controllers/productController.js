import Product from "../models/product.js";

export const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

export const searchProducts = async (req, res) => {
  const { name, category, classLevel } = req.query;
  const filter = {};

  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }

  if (category) {
    filter.category = category;
  }

  if (classLevel) {
    filter.classLevel = classLevel;
  }

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ products });
};

export const updateStock = async (req, res) => {
  const { quantity } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ msg: "Product not found" });
  }

  product.stockQuantity = Number(product.stockQuantity) + Number(quantity);
  await product.save();

  res.json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
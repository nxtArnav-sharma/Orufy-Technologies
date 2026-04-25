const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// In-memory store for fallback
let memoryProducts = [
  { _id: '1', name: 'Premium Brownie', type: 'Bakery', stock: 50, mrp: 200, sellingPrice: 150, brand: 'CakeZone', isPublished: true },
  { _id: '2', name: 'Walnut Cake', type: 'Bakery', stock: 20, mrp: 500, sellingPrice: 450, brand: 'CakeZone', isPublished: false }
];

const isDBConnected = () => mongoose.connection.readyState === 1;

// Input validation middleware
const validateProduct = (req, res, next) => {
  const { name, type, mrp, sellingPrice, stock } = req.body;
  const errors = [];

  if (!name || name.trim() === '') errors.push('Product name is required');
  if (!type || type.trim() === '') errors.push('Product type is required');
  if (mrp === undefined || isNaN(Number(mrp)) || Number(mrp) < 0) errors.push('Valid MRP is required');
  if (sellingPrice === undefined || isNaN(Number(sellingPrice)) || Number(sellingPrice) < 0) errors.push('Valid selling price is required');
  if (stock === undefined || isNaN(Number(stock)) || Number(stock) < 0) errors.push('Valid stock quantity is required');
  if (Number(sellingPrice) > Number(mrp)) errors.push('Selling price cannot be greater than MRP');

  if (errors.length > 0) {
    return res.status(400).json({ message: 'Validation failed', errors });
  }
  next();
};

// Create a product
router.post('/', validateProduct, async (req, res) => {
  try {
    if (isDBConnected()) {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } else {
      const product = { ...req.body, _id: Date.now().toString() };
      memoryProducts.push(product);
      res.status(201).json(product);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const { isPublished } = req.query;
    const filterPublished = isPublished === 'true';

    if (isDBConnected()) {
      const products = await Product.find({ isPublished: filterPublished }).sort({ createdAt: -1 });
      res.json(products);
    } else {
      const products = memoryProducts.filter(p => p.isPublished === filterPublished);
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a product
router.put('/:id', validateProduct, async (req, res) => {
  try {
    if (isDBConnected()) {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } else {
      const index = memoryProducts.findIndex(p => p._id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Product not found' });
      memoryProducts[index] = { ...memoryProducts[index], ...req.body };
      res.json(memoryProducts[index]);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    if (isDBConnected()) {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted' });
    } else {
      memoryProducts = memoryProducts.filter(p => p._id !== req.params.id);
      res.json({ message: 'Product deleted' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

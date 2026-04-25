const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  mrp: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String },
  images: [{ type: String }], // Array of image URLs/paths
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

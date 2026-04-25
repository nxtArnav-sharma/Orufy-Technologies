import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProductDrawer.css';

const AddProductDrawer = ({ isOpen, onClose, onProductAdded, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    stock: '',
    mrp: '',
    sellingPrice: '',
    brand: '',
    description: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        type: productToEdit.type || '',
        stock: productToEdit.stock || '',
        mrp: productToEdit.mrp || '',
        sellingPrice: productToEdit.sellingPrice || '',
        brand: productToEdit.brand || '',
        description: productToEdit.description || ''
      });
    } else {
      setFormData({
        name: '',
        type: '',
        stock: '',
        mrp: '',
        sellingPrice: '',
        brand: '',
        description: ''
      });
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        stock: Number(formData.stock),
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
      };

      if (productToEdit) {
        await axios.put(`http://localhost:5000/api/products/${productToEdit._id}`, payload);
      } else {
        await axios.post('http://localhost:5000/api/products', { ...payload, isPublished: true });
      }
      
      onProductAdded();
      onClose();
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{productToEdit ? 'Edit Product' : 'Add Product'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="drawer-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Product Type</label>
            <input type="text" name="type" value={formData.type} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Quantity Stock</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>MRP</label>
              <input type="number" name="mrp" value={formData.mrp} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Selling Price</label>
              <input type="number" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Brand Name</label>
              <input type="text" name="brand" value={formData.brand} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="submit-btn">{productToEdit ? 'Update Product' : 'Add Product'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductDrawer;

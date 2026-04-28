import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import './AddProductDrawer.css';

const AddProductDrawer = ({ isOpen, onClose, onProductAdded, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Foods',
    stock: '',
    mrp: '',
    sellingPrice: '',
    brand: '',
    description: '',
    eligibility: 'Yes'
  });
  
  const [images, setImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        type: productToEdit.type || 'Foods',
        stock: productToEdit.stock || '',
        mrp: productToEdit.mrp || '',
        sellingPrice: productToEdit.sellingPrice || '',
        brand: productToEdit.brand || '',
        description: productToEdit.description || '',
        eligibility: 'Yes'
      });
      setImages(productToEdit.images || []);
    } else {
      setFormData({
        name: '',
        type: 'Foods',
        stock: '',
        mrp: '',
        sellingPrice: '',
        brand: '',
        description: '',
        eligibility: 'Yes'
      });
      setImages([]);
    }
    setValidationErrors({});
  }, [productToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter product name';
    if (!formData.type.trim()) errors.type = 'Please select product type';
    if (!String(formData.stock).trim()) errors.stock = 'Please enter quantity stock';
    if (!String(formData.mrp).trim()) errors.mrp = 'Please enter MRP';
    if (!String(formData.sellingPrice).trim()) errors.sellingPrice = 'Please enter selling price';
    if (!formData.brand.trim()) errors.brand = 'Please enter brand name';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    });
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const payload = {
        ...formData,
        stock: Number(formData.stock),
        mrp: Number(formData.mrp),
        sellingPrice: Number(formData.sellingPrice),
        images: images
      };

      delete payload.eligibility;

      if (productToEdit) {
        await api.put(`/products/${productToEdit._id}`, payload);
      } else {
        await api.post('/products', { ...payload, isPublished: true });
      }
      
      onProductAdded();
      onClose();
    } catch (err) {
      console.error('Request failed:', err);
      
      if (err.response) {
        const data = err.response.data;
        let alertMsg = data.message || 'Failed to save product';
        if (data.errors && data.errors.length > 0) {
          alertMsg += '\n\n' + data.errors.join('\n');
        }
        alert(alertMsg);
      } else {
        alert(err.message || 'Failed to save product');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h2>{productToEdit ? 'Edit Product' : 'Add Product'}</h2>
          <button className="close-btn" onClick={onClose} type="button">&times;</button>
        </div>
        
        <form className="drawer-form modal-form" onSubmit={handleSubmit} noValidate>
          <div className="form-scroll-area">
            <div className={`form-group ${validationErrors.name ? 'has-error' : ''}`}>
              <label>Product Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
              />
              {validationErrors.name && <span className="error-text">{validationErrors.name}</span>}
            </div>
            
            <div className={`form-group ${validationErrors.type ? 'has-error' : ''}`}>
              <label>Product Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Foods">Foods</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Course">Course</option>
                <option value="Other">Other</option>
              </select>
              {validationErrors.type && <span className="error-text">{validationErrors.type}</span>}
            </div>

            <div className={`form-group ${validationErrors.stock ? 'has-error' : ''}`}>
              <label>Quantity Stock</label>
              <input 
                type="number" 
                name="stock" 
                value={formData.stock} 
                onChange={handleChange} 
              />
              {validationErrors.stock && <span className="error-text">{validationErrors.stock}</span>}
            </div>

            <div className={`form-group ${validationErrors.mrp ? 'has-error' : ''}`}>
              <label>MRP</label>
              <input 
                type="number" 
                name="mrp" 
                value={formData.mrp} 
                onChange={handleChange} 
              />
              {validationErrors.mrp && <span className="error-text">{validationErrors.mrp}</span>}
            </div>

            <div className={`form-group ${validationErrors.sellingPrice ? 'has-error' : ''}`}>
              <label>Selling Price</label>
              <input 
                type="number" 
                name="sellingPrice" 
                value={formData.sellingPrice} 
                onChange={handleChange} 
              />
              {validationErrors.sellingPrice && <span className="error-text">{validationErrors.sellingPrice}</span>}
            </div>

            <div className={`form-group ${validationErrors.brand ? 'has-error' : ''}`}>
              <label>Brand Name</label>
              <input 
                type="text" 
                name="brand" 
                value={formData.brand} 
                onChange={handleChange} 
              />
              {validationErrors.brand && <span className="error-text">{validationErrors.brand}</span>}
            </div>

            <div className="form-group image-upload-group">
              <div className="image-upload-header">
                <label>Upload Product Images</label>
                <span className="add-more-link" onClick={() => fileInputRef.current?.click()}>Add More Photos</span>
              </div>
              
              <div className={`image-upload-area ${images.length > 0 ? 'has-images' : ''}`} onClick={() => { if(images.length === 0) fileInputRef.current?.click() }}>
                {images.length === 0 ? (
                  <div className="upload-placeholder">
                    <span>Click to upload images</span>
                  </div>
                ) : (
                  <div className="image-thumbnails">
                    {images.map((img, idx) => (
                      <div className="thumbnail-wrapper" key={idx} onClick={(e) => e.stopPropagation()}>
                        <img src={img} alt={`Product ${idx}`} className="thumbnail-img" />
                        <button type="button" className="remove-img-btn" onClick={() => removeImage(idx)}>&times;</button>
                      </div>
                    ))}
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  multiple 
                  style={{ display: 'none' }} 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Exchange or return eligibility</label>
              <select name="eligibility" value={formData.eligibility} onChange={handleChange}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          <div className="drawer-footer">
            <button type="submit" className="submit-btn-modal">
              {productToEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductDrawer;

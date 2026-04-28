import React, { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onEdit, onDelete, onTogglePublish }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['https://via.placeholder.com/250x200?text=No+Image'];

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img 
          src={images[currentImageIndex]} 
          alt={product.name} 
          className="product-card-image" 
        />
        {images.length > 1 && (
          <>
            <button className="carousel-btn left" onClick={handlePrevImage}>‹</button>
            <button className="carousel-btn right" onClick={handleNextImage}>›</button>
            <div className="carousel-dots">
              {images.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="product-card-content">
        <h3 className="product-card-title">{product.name}</h3>
        
        <div className="product-details-list">
          <div className="detail-row">
            <span className="detail-label">Product type</span>
            <span className="detail-value">{product.type}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Quantity Stock</span>
            <span className="detail-value">{product.stock}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">MRP</span>
            <span className="detail-value">₹ {product.mrp}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Selling Price</span>
            <span className="detail-value">₹ {product.sellingPrice}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Brand Name</span>
            <span className="detail-value">{product.brand || 'N/A'}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Total Number of images</span>
            <span className="detail-value">{product.images ? product.images.length : 0}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Exchange Eligibility</span>
            <span className="detail-value">{product.exchangeEligibility || 'YES'}</span>
          </div>
        </div>
      </div>

      <div className="product-card-actions">
        <button 
          className={`action-btn-main ${product.isPublished ? 'unpublish-btn' : 'publish-btn'}`}
          onClick={() => onTogglePublish(product)}
        >
          {product.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <button className="action-btn-secondary" onClick={() => onEdit(product)}>
          Edit
        </button>
        <button className="action-btn-icon delete-btn" onClick={() => onDelete(product)}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

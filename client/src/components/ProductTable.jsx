import React from 'react';
import './ProductTable.css';

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Type</th>
            <th>Stock</th>
            <th>MRP</th>
            <th>Selling Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                <div className="product-info">
                  <div className="product-img-placeholder">📦</div>
                  <span>{product.name}</span>
                </div>
              </td>
              <td>{product.type}</td>
              <td>{product.stock}</td>
              <td>₹{product.mrp}</td>
              <td>₹{product.sellingPrice}</td>
              <td className="actions">
                <button className="action-btn edit" onClick={() => onEdit(product)}>✏️</button>
                <button className="action-btn delete" onClick={() => onDelete(product._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

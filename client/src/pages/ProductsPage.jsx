import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddProductDrawer from '../components/AddProductDrawer';
import ProductCard from '../components/ProductCard';
import api from '../api';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToastNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleProductAdded = () => {
    fetchProducts();
    showToastNotification('Product added Successfully');
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await api.delete(`/products/${productToDelete._id}`);
      fetchProducts();
      setProductToDelete(null);
      showToastNotification('Product Deleted Successfully');
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowDrawer(true);
  };

  const handleTogglePublish = async (product) => {
    try {
      await api.put(`/products/${product._id}`, { ...product, isPublished: !product.isPublished });
      fetchProducts();
    } catch (err) {
      console.error('Error toggling publish status:', err);
    }
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
    setProductToEdit(null);
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page-layout">
      <Sidebar onSearch={setSearchTerm} />
      <main className="products-page-main">
        <header className="products-page-header-top">
          <div className="page-title">
            <span className="icon">🛍️</span> Products
          </div>
          <div className="header-right">
            <div className="header-search">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search Services, Products" 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="user-profile">
              <span className="profile-icon">👤</span>
            </div>
          </div>
        </header>

        <section className="products-page-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : products.length === 0 ? (
            <div className="empty-state-custom">
              <div className="empty-icon-custom">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1e2bc2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                  <path d="M14 17.5H21M17.5 14V21"></path>
                </svg>
              </div>
              <h2>Feels a little empty over here...</h2>
              <p>You can create products without connecting store you can add products to store anytime</p>
              <button className="add-products-btn" onClick={() => setShowDrawer(true)}>
                Add your Products
              </button>
            </div>
          ) : (
            <div className="products-grid-wrapper">
               <div className="products-grid-header">
                 <h2 className="products-grid-title">Products</h2>
                 <button className="add-product-link" onClick={() => setShowDrawer(true)}>
                   + Add Products
                 </button>
               </div>
               
               <div className="products-grid">
                 {filteredProducts.map(product => (
                   <ProductCard 
                     key={product._id} 
                     product={product} 
                     onEdit={handleEdit} 
                     onDelete={handleDeleteClick} 
                     onTogglePublish={handleTogglePublish}
                   />
                 ))}
               </div>
            </div>
          )}
        </section>

        <AddProductDrawer 
          isOpen={showDrawer} 
          onClose={handleCloseDrawer} 
          onProductAdded={handleProductAdded} 
          productToEdit={productToEdit}
        />
        
        {productToDelete && (
          <div className="delete-modal-overlay" onClick={() => setProductToDelete(null)}>
            <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="delete-modal-header">
                <h2>Delete Product</h2>
                <button className="close-btn" onClick={() => setProductToDelete(null)}>&times;</button>
              </div>
              <div className="delete-modal-body">
                <p>Are you sure you really want to delete this Product <br />" <strong>{productToDelete.name}</strong> " ?</p>
              </div>
              <div className="delete-modal-footer">
                <button className="delete-confirm-btn" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <div className="custom-toast">
            <span className="toast-icon">✅</span>
            <span className="toast-text">{toastMessage}</span>
            <button className="toast-close" onClick={() => setShowToast(false)}>&times;</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddProductDrawer from '../components/AddProductDrawer';
import ProductCard from '../components/ProductCard';
import api from '../api';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('published');
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
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/products', {
        params: { isPublished: activeTab === 'published' },
      });
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
    <div className="dashboard-layout">
      <Sidebar onSearch={setSearchTerm} />
      <main className="dashboard-main">
        <header className="dashboard-header-top">
          <div className="page-title">
            <span className="icon">🏠</span> Home
          </div>
          <div className="header-right">
            <div className="user-profile">
              <span className="profile-icon">👤</span>
            </div>
          </div>
        </header>

        <div className="dashboard-tabs-container">
          <div className="tabs">
            <button 
              className={activeTab === 'published' ? 'tab active' : 'tab'} 
              onClick={() => setActiveTab('published')}
            >
              Published
            </button>
            <button 
              className={activeTab === 'unpublished' ? 'tab active' : 'tab'} 
              onClick={() => setActiveTab('unpublished')}
            >
              Unpublished
            </button>
          </div>
        </div>

        <section className="dashboard-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁+</div>
              <h2>No {activeTab} Products</h2>
              <p>Your {activeTab} Products will appear here.</p>
            </div>
          ) : (
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

export default Dashboard;

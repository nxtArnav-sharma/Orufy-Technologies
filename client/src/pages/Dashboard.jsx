import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddProductDrawer from '../components/AddProductDrawer';
import ProductTable from '../components/ProductTable';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('published');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/products?isPublished=${activeTab === 'published'}`);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error('Error deleting product:', err);
      }
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowDrawer(true);
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
        <header className="dashboard-header">
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
          <div className="header-right">
            <button className="add-product-btn" onClick={() => setShowDrawer(true)}>
              + Add Product
            </button>
            <div className="user-profile">
              <span className="profile-icon">👤</span>
            </div>
          </div>
        </header>

        <section className="dashboard-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📁+</div>
              <h2>No {activeTab} Products</h2>
              <p>Your {activeTab} Products will appear here. Create your first product to publish</p>
            </div>
          ) : (
            <ProductTable 
              products={filteredProducts} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          )}
        </section>

        <AddProductDrawer 
          isOpen={showDrawer} 
          onClose={handleCloseDrawer} 
          onProductAdded={fetchProducts} 
          productToEdit={productToEdit}
        />
      </main>
    </div>
  );
};

export default Dashboard;

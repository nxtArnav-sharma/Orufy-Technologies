import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AddProductDrawer from '../components/AddProductDrawer';
import ProductTable from '../components/ProductTable';
import api from '../api';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
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
    <div className="products-page-layout">
      <Sidebar onSearch={setSearchTerm} />
      <main className="products-page-main">
        <header className="products-page-header">
          <div className="page-title">
            <span className="icon">🛍️</span> Products
          </div>
          <div className="header-right">
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
            <div className="products-list-wrapper">
               <button className="add-product-btn-top" onClick={() => setShowDrawer(true)}>+ Add Product</button>
               <ProductTable 
                 products={filteredProducts} 
                 onEdit={handleEdit} 
                 onDelete={handleDelete} 
               />
            </div>
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

export default ProductsPage;

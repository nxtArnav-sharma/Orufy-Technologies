import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import './Sidebar.css';

const Sidebar = ({ onSearch }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <img src={logo} alt="Productr" className="sidebar-logo" />
        <span className="sidebar-brand-name">Productr</span>
      </div>
      
      <div className="sidebar-search">
        <input 
          type="text" 
          placeholder="Search" 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="icon">🏠</span> Home
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <span className="icon">🛍️</span> Products
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import runner from '../assets/runner.png';
import './Login.css'; // Reuse login layout styles

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    // Simulate signup — in a real app this would call an API
    console.log('Signing up:', formData);
    navigate('/otp');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand-header">
          <span className="brand-name">Productr</span>
          <img src={logo} alt="" className="logo-small" />
        </div>
        <div className="hero-box">
          <div className="hero-img-wrapper">
            <img src={runner} alt="Runner" className="hero-img" />
          </div>
          <div className="hero-text">
            <h2>Uplist your product to market</h2>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-box">
          <button className="back-btn" onClick={() => navigate('/login')}>← Back to Login</button>
          <h1>Create your Productr Account</h1>
          <p className="otp-desc">Fill in the details below to get started</p>

          <form onSubmit={handleSignup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="signup-email">Email Address</label>
            <input
              type="email"
              id="signup-email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            {error && <p className="error-msg">{error}</p>}

            <button type="submit" className="login-btn">Create Account</button>
          </form>

          <p className="signup-link">
            Already have an account? <a href="/login">Login Here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

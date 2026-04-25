import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import runner from '../assets/runner.png';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate OTP sent
    console.log('OTP sent to:', email);
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
          <h1>Login to your Productr Account</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email or Phone number</label>
            <input
              type="text"
              id="email"
              placeholder="Enter email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-link">
            Don't have a Productr Account? <Link to="/signup">SignUp Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

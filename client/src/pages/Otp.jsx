import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import runner from '../assets/runner.png';
import './Login.css'; // Reuse login layout styles
import './Otp.css';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    console.log('Verifying OTP:', otp.join(''));
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="brand-header">
          <span className="brand-name">Productr</span>
          <img src={logo} alt="" className="logo-small" />
        </div>
        <div className="hero-box">
          <img src={runner} alt="Runner" className="hero-img" />
          <div className="hero-text">
            <h2>Uplist your product to market</h2>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-form-box">
          <button className="back-btn" onClick={() => navigate('/login')}>← Back to Login</button>
          <h1>Enter OTP</h1>
          <p className="otp-desc">We have sent a 4-digit code to your email</p>
          <form onSubmit={handleVerify}>
            <div className="otp-inputs">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  required
                />
              ))}
            </div>
            <button type="submit" className="login-btn">Verify</button>
          </form>
          <p className="signup-link">
            Didn't receive the code? <a href="#">Resend Code</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

// Demo accounts
const DEMO_ACCOUNTS = {
  user: {
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User',
    role: 'user'
  },
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin',
    role: 'admin'
  }
};

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check if credentials match demo accounts
    const adminAccount = DEMO_ACCOUNTS.admin;
    const userAccount = DEMO_ACCOUNTS.user;

    if (formData.email === adminAccount.email && formData.password === adminAccount.password) {
      login(adminAccount);
      navigate('/admin');
    } else if (formData.email === userAccount.email && formData.password === userAccount.password) {
      login(userAccount);
      navigate('/');
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng nhập</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=""
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              required
            />
            <label htmlFor="password">Mật khẩu</label>
          </div>
          <button type="submit" className="btn-login">
            Đăng nhập
          </button>
        </form>
        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password">
            Quên mật khẩu?
          </Link>
          <p className="register-link">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
        <div className="demo-account">
          <h3>Tài khoản demo:</h3>
          <div className="demo-account-section">
            <h4>Người dùng:</h4>
            <p>Email: demo@example.com</p>
            <p>Password: demo123</p>
          </div>
          <div className="demo-account-section">
            <h4>Admin:</h4>
            <p>Email: admin@example.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
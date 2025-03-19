import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import useScrollPosition from '../hooks/useScrollPosition';

const Navbar = () => {
  const location = useLocation();
  const isScrolled = useScrollPosition();

  return (
    <nav className={`nav-main ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-wrapper">
        <Link to="/" className="nav-logo">
          <img src="../img/logo.png" alt="logo" />
          HousePredict
        </Link>
        <ul className="nav-menu">
          <li>
            <Link 
              to="/" 
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              Trang Chủ
            </Link>
          </li>
          <li>
            <Link 
              to="/input" 
              className={`nav-item ${location.pathname === '/input' ? 'active' : ''}`}
            >
              Dự Đoán
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
            >
              Về Chúng Tôi
            </Link>
          </li>
          <li>
            <Link 
              to="/login" 
              className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}
            >
              Đăng Nhập
            </Link>
          </li>
          <li>
            <Link 
              to="/register" 
              className={`nav-item ${location.pathname === '/register' ? 'active' : ''}`}
            >
              Đăng Ký
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
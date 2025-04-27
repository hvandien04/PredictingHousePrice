import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import useScrollPosition from '../hooks/useScrollPosition';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isScrolled = useScrollPosition();
  const { user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setShowUserDropdown(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`nav-main ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-wrapper">
        <Link to="/" className="nav-logo">
          <img src="/img/logo.png" alt="logo" />
          HousePredict
        </Link>

        <button 
          className="hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
        </button>

        <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <li>
            <Link 
              to="/input" 
              className={`nav-item ${location.pathname === '/input' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Dự Đoán
            </Link>
          </li>
          <li>
            <Link 
              to="/compare" 
              className={`nav-item ${location.pathname === '/compare' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              So Sánh
            </Link>
          </li>
          <li>
            <Link 
              to="/sell-house" 
              className={`nav-item ${location.pathname === '/sell-house' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Đăng Bán
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeAllMenus}
            >
              Về Chúng Tôi
            </Link>
          </li>
          {!user ? (
            <li>
              <Link 
                to="/login" 
                className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={closeAllMenus}
              >
                Đăng Nhập
              </Link>
            </li>
          ) : (
            <li className={`user-menu ${showUserDropdown ? 'active' : ''}`}>
              <div 
                className="user-info"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <span className="user-avatar">
                  {user.name.charAt(0)}
                </span>
                <span className="user-name">{user.name}</span>
                <i className={`fas fa-chevron-down ${showUserDropdown ? 'rotate' : ''}`}></i>
              </div>
              {showUserDropdown && (
                <div className="dropdown-menu">
                  <Link to="/profile" className="dropdown-item" onClick={closeAllMenus}>
                    Thông Tin Cá Nhân
                    
                  </Link>
                  
                  <Link to="/history" className="dropdown-item" onClick={closeAllMenus}>
                    Lịch Sử Dự Đoán
                  </Link>
                  <Link to="/sell-history" className="dropdown-item" onClick={closeAllMenus}>
                    Lịch Sử Đăng Bán
                  </Link>
                  <Link to="/statistics" className="dropdown-item" onClick={closeAllMenus}>
                    Thống Kê
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Đăng Xuất
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeAllMenus}
        />
      </div>
    </nav>
  );
};

export default Navbar;
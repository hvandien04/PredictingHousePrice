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
        <ul className="nav-menu">
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
              to="/compare" 
              className={`nav-item ${location.pathname === '/compare' ? 'active' : ''}`}
            >
              So Sánh
            </Link>
          </li>
          <li>
            <Link 
              to="/sell-house" 
              className={`nav-item ${location.pathname === '/sell-house' ? 'active' : ''}`}
            >
              Đăng Bán
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
          {!user ? (
            <li>
              <Link 
                to="/login" 
                className={`nav-item ${location.pathname === '/login' ? 'active' : ''}`}
              >
                Đăng Nhập
              </Link>
            </li>
          ) : (
            <li className="user-menu">
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
                  <Link to="/profile" className="dropdown-item">
                    Thông Tin Cá Nhân
                  </Link>
                  <Link to="/history" className="dropdown-item">
                    Lịch Sử Dự Đoán
                  </Link>
                  <Link to="/sell-history" className="dropdown-item">
                    Lịch Sử Đăng Bán
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    Đăng Xuất
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HousePredict</h3>
          <p>Ứng dụng dự đoán giá nhà thông minh sử dụng công nghệ AI tiên tiến, giúp bạn đưa ra quyết định tốt nhất.</p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul className="footer-links">
            <li><Link to="/"><i className="fa-solid fa-house"></i> Trang chủ</Link></li>
            <li><Link to="/about"><i className="fa-solid fa-info-circle"></i> Giới thiệu</Link></li>
            <li><Link to="/input"><i className="fa-solid fa-calculator"></i> Dự đoán giá</Link></li>
            <li><Link to="/login"><i className="fa-solid fa-right-to-bracket"></i> Đăng nhập</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Liên hệ</h3>
          <div className="contact-info">
            <p>
              <i className="fa-solid fa-location-dot"></i>
              227 Nguyễn Văn Cừ, Quận 5, TP.HCM
            </p>
            <p>
              <i className="fa-solid fa-phone"></i>
              (84) 123 456 789
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i>
              contact@housepredict.com
            </p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p><i className="fa-regular fa-copyright"></i> 2024 HousePredict. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about">
        <h1>Về HousePredict</h1>
        <div className="about-content">
          <div className="about-section">
            <h2>🎯 Giới thiệu</h2>
            <p>
              HousePredict là một ứng dụng dự đoán giá nhà thông minh, sử dụng công nghệ AI tiên tiến 
              để cung cấp cho bạn những dự đoán chính xác về giá bất động sản tại TP.HCM.
            </p>
          </div>

          <div className="about-section feature-section">
            <h2>✨ Tính năng nổi bật</h2>
            <div className="features-list">
              <div className="feature-item">
                <h3>Dự đoán chính xác</h3>
                <p>Sử dụng mô hình AI được huấn luyện với dữ liệu thực tế từ thị trường bất động sản TP.HCM</p>
              </div>
              <div className="feature-item">
                <h3>Dễ dàng sử dụng</h3>
                <p>Giao diện thân thiện, chỉ cần nhập thông tin cơ bản về bất động sản</p>
              </div>
              <div className="feature-item">
                <h3>Kết quả nhanh chóng</h3>
                <p>Nhận kết quả dự đoán ngay lập tức, không cần chờ đợi</p>
              </div>
            </div>
          </div>

          <div className="about-section team-section">
            <h2>👥 Đội ngũ phát triển</h2>
            <p>
              Chúng tôi là nhóm sinh viên đam mê công nghệ từ trường Đại học Giao thông Vận tải TPHCM,
              với mục tiêu tạo ra công cụ hữu ích cho người dùng trong lĩnh vực bất động sản.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 
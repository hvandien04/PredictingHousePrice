import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import banner from '../assets/banner.jpg';

const Home = () => {
  // Dữ liệu mẫu cho các tính năng chính
  const features = [
    {
      icon: 'fa-solid fa-calculator',
      title: 'Dự đoán giá nhà',
      description: 'Sử dụng AI để dự đoán chính xác giá nhà dựa trên các thông số quan trọng'
    },
    {
      icon: 'fa-solid fa-clock-rotate-left',
      title: 'Lịch sử tra cứu',
      description: 'Lưu trữ và quản lý lịch sử các lần dự đoán của bạn'
    },
    {
      icon: 'fa-solid fa-robot',
      title: 'AI Thông minh',
      description: 'Công nghệ AI tiên tiến, học máy chính xác cao'
    }
  ];

  // Dữ liệu mẫu cho các dự đoán gần đây
  const recentPredictions = [
    {
      location: 'Quận 1, TP.HCM',
      price: '2.5 tỷ',
      date: '15/03/2024',
      area: '100m²'
    },
    {
      location: 'Quận 7, TP.HCM',
      price: '1.8 tỷ',
      date: '14/03/2024',
      area: '80m²'
    },
    {
      location: 'Quận 3, TP.HCM',
      price: '3.2 tỷ',
      date: '13/03/2024',
      area: '120m²'
    }
  ];

  return (
    <div className="home">
      {/* Banner Section */}
      <div className="home-content">
        <h1 className="home-title">HousePredict</h1>
        <p className="home-slogan">Dự đoán giá nhà với AI</p>
        <Link to="/input" className="predict-button">
          Dự đoán ngay!
        </Link>
      </div>
      <div className="home-banner">
        <img src={banner} alt="Statistics Banner" />
      </div>

      {/* Features Section */}
      <section className="features">
        <h2>Tính năng chính</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <i className={feature.icon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Predictions Section */}
      <section className="recent-predictions">
        <h2>Dự đoán gần đây</h2>
        <div className="predictions-grid">
          {recentPredictions.map((prediction, index) => (
            <div key={index} className="prediction-card">
              <div className="prediction-header">
                <i className="fa-solid fa-location-dot"></i>
                <h3>{prediction.location}</h3>
              </div>
              <div className="prediction-details">
                <p><i className="fa-solid fa-money-bill-wave"></i> {prediction.price}</p>
                <p><i className="fa-solid fa-ruler-combined"></i> {prediction.area}</p>
                <p><i className="fa-solid fa-calendar"></i> {prediction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home; 
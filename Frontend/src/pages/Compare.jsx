import React, { useState } from 'react';
import '../styles/Compare.css';

const Compare = () => {
  const [houses, setHouses] = useState([
    {
      id: 1,
      image: '/img/house1.jpg',
      price: '2.390.000.000đ',
      features: [
        'Diện tích: 100m²',
        'Số phòng ngủ: 3',
        'Số phòng tắm: 2',
        'Hướng: Đông Nam',
        'Kết nối giao thông'
      ],
      location: 'Quận 7, TP.HCM',
      type: 'Nhà phố',
      area: '100 m²'
    },
    {
      id: 2,
      image: '/img/house2.jpg',
      price: '3.100.000.000đ',
      features: [
        'Diện tích: 120m²',
        'Số phòng ngủ: 4',
        'Số phòng tắm: 3',
        'Hướng: Đông',
        'Gần trung tâm'
      ],
      location: 'Quận 2, TP.HCM',
      type: 'Biệt thự',
      area: '120 m²'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddHouse = () => {
    setShowAddForm(true);
  };

  return (
    <div className="compare-container">
      <h1>So sánh bất động sản</h1>
      
      <div className="compare-grid">
        <div className="compare-header">
          <div className="checkbox-cell">
            <input type="checkbox" id="selectAll" />
            <label htmlFor="selectAll">Chỉ xem điểm khác biệt</label>
          </div>
        </div>

        <div className="compare-content">
          {houses.map(house => (
            <div key={house.id} className="house-column">
              <div className="house-image">
                <img src={house.image} alt="House" />
              </div>
              <div className="house-price">
                <span className="current-price">{house.price}</span>
              </div>
              <div className="house-features">
                {house.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    {feature}
                  </div>
                ))}
              </div>
              <div className="house-details">
                <div className="detail-row">
                  <span className="detail-label">Vị trí:</span>
                  <span className="detail-value">{house.location}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Loại nhà:</span>
                  <span className="detail-value">{house.type}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Diện tích:</span>
                  <span className="detail-value">{house.area}</span>
                </div>
              </div>
              <div className="action-buttons">
                <button className="btn-buy">LIÊN HỆ NGAY</button>
              </div>
            </div>
          ))}

          <div className="add-house-column">
            <button className="add-house-btn" onClick={handleAddHouse}>
              <span>+</span>
              <span>Thêm bất động sản</span>
            </button>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="add-house-modal">
          {/* Add house form will go here */}
        </div>
      )}
    </div>
  );
};

export default Compare; 
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
        'Gần trung tâm'
      ],
      location: 'Quận 2, TP.HCM',
      type: 'Biệt thự',
      area: '120 m²'
    }
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);

  const handleAddHouse = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedHouse(null);
  };

  const handleAddSelectedHouse = () => {
    if (selectedHouse) {
      setHouses([...houses, selectedHouse]);
      handleCloseModal();
    }
  };

  const availableHouses = [
    {
      id: 3,
      image: '/img/house3.jpg',
      price: '2.800.000.000đ',
      features: [
        'Diện tích: 110m²',
        'Số phòng ngủ: 3',
        'Số phòng tắm: 2',
        'Có gara'
      ],
      location: 'Quận 3, TP.HCM',
      type: 'Nhà phố',
      area: '110 m²'
    },
    {
      id: 4,
      image: '/img/house4.jpg',
      price: '3.500.000.000đ',
      features: [
        'Diện tích: 150m²',
        'Số phòng ngủ: 5',
        'Số phòng tắm: 4',
        'Có hồ bơi'
      ],
      location: 'Quận 9, TP.HCM',
      type: 'Biệt thự',
      area: '150 m²'
    }
  ];

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

      {openModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chọn nhà để so sánh</h2>
            </div>
            <div className="modal-body">
              <select 
                className="modal-select"
                value={selectedHouse?.id || ''}
                onChange={(e) => {
                  const house = availableHouses.find(h => h.id === Number(e.target.value));
                  setSelectedHouse(house);
                }}
              >
                <option value="">Chọn nhà</option>
                {availableHouses.map(house => (
                  <option key={house.id} value={house.id}>
                    {house.type} - {house.location} - {house.price}
                  </option>
                ))}
              </select>

              {selectedHouse && (
                <div className="house-details-modal">
                  <div className="house-image">
                    <img src={selectedHouse.image} alt="Selected House" />
                  </div>
                  <div className="house-details">
                    <div className="detail-row">
                      <span className="detail-label">Giá:</span>
                      <span className="detail-value">{selectedHouse.price}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Diện tích:</span>
                      <span className="detail-value">{selectedHouse.area}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Vị trí:</span>
                      <span className="detail-value">{selectedHouse.location}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Loại nhà:</span>
                      <span className="detail-value">{selectedHouse.type}</span>
                    </div>
                  </div>
                  <div className="house-features">
                    <h3>Tiện nghi:</h3>
                    <ul>
                      {selectedHouse.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="modal-button modal-button-cancel"
                onClick={handleCloseModal}
              >
                Hủy
              </button>
              <button 
                className="modal-button modal-button-add"
                onClick={handleAddSelectedHouse}
                disabled={!selectedHouse}
              >
                Thêm vào so sánh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare; 
import React, { useState } from 'react';
import '../styles/InputForm.css';
import '../styles/animations.css';

const InputForm = () => {
  const [formData, setFormData] = useState({
    district: '',
    area: '',
    rooms: '',
    floors: '',
    yearBuilt: '',
    direction: '',
    streetWidth: '',
    hasElevator: false,
    hasParking: false,
    hasSecurity: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý dữ liệu form và gửi lên server
    console.log('Form data:', formData);
  };

  return (
    <div className="input-form-page">
      <div className="input-form-wrapper">
        <h1 className="fade-in-up">Dự đoán giá nhà</h1>
        <form onSubmit={handleSubmit} className="input-form-grid">
          <div className="input-field-group fade-in-up delay-1">
            <label htmlFor="district">Quận/Huyện</label>
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            >
              <option value="">Chọn quận/huyện</option>
              <option value="quan1">Quận 1</option>
              <option value="quan2">Quận 2</option>
              <option value="quan3">Quận 3</option>
              {/* Thêm các quận khác */}
            </select>
          </div>

          <div className="input-field-group fade-in-up delay-2">
            <label htmlFor="area">Diện tích (m²)</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </div>

          <div className="input-field-group fade-in-up delay-2">
            <label htmlFor="rooms">Số phòng ngủ</label>
            <input
              type="number"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </div>

          <div className="input-field-group fade-in-up delay-2">
            <label htmlFor="floors">Số tầng</label>
            <input
              type="number"
              id="floors"
              name="floors"
              value={formData.floors}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </div>

          <div className="input-field-group fade-in-up delay-2">
            <label htmlFor="yearBuilt">Năm xây dựng</label>
            <input
              type="number"
              id="yearBuilt"
              name="yearBuilt"
              value={formData.yearBuilt}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </div>

          {/* <div className="input-field-group fade-in-up delay-2">
            <label htmlFor="direction">Hướng nhà</label>
            <select
              id="direction"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              required
            >
              <option value="">Chọn hướng</option>
              <option value="dong">Đông</option>
              <option value="tay">Tây</option>
              <option value="nam">Nam</option>
              <option value="bac">Bắc</option>
              <option value="dong-bac">Đông Bắc</option>
              <option value="dong-nam">Đông Nam</option>
              <option value="tay-bac">Tây Bắc</option>
              <option value="tay-nam">Tây Nam</option>
            </select>
          </div> */}

          <div className="input-field-group fade-in-up delay-2">
            <label htmlFor="streetWidth">Độ rộng đường (m)</label>
            <input
              type="number"
              id="streetWidth"
              name="streetWidth"
              value={formData.streetWidth}
              onChange={handleChange}
              placeholder=" "
              required
            />
          </div>

          <div className="input-field-group input-checkbox-group fade-in-up delay-3">
            <label>
              <input
                type="checkbox"
                name="hasElevator"
                checked={formData.hasElevator}
                onChange={handleChange}
              />
              Có thang máy
            </label>
            <label>
              <input
                type="checkbox"
                name="hasParking"
                checked={formData.hasParking}
                onChange={handleChange}
              />
              Có bãi đỗ xe
            </label>
            <label>
              <input
                type="checkbox"
                name="hasSecurity"
                checked={formData.hasSecurity}
                onChange={handleChange}
              />
              Có bảo vệ
            </label>
          </div>

          <button type="submit" className="input-submit-btn fade-in-up delay-3">
            Dự Đoán Giá
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm; 
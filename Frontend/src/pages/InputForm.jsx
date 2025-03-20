import React, { useState, useEffect } from 'react';
import '../styles/InputForm.css';
import '../styles/animations.css';

const InputForm = () => {
  const [formData, setFormData] = useState({
    houseType: '',
    district: '',
    area: '',
    rooms: '',
    floors: ''
  });

  const [houseTypes, setHouseTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/house-types")
        .then(res => res.json())
        .then(data => setHouseTypes(data))
        .catch(err => console.error("Lỗi lấy loại nhà:", err));

    fetch("http://127.0.0.1:5000/districts")
        .then(res => res.json())
        .then(data => setDistricts(data))
        .catch(err => console.error("Lỗi lấy quận/huyện:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      loai_nha: formData.houseType,
      vi_tri: formData.district,
      dien_tich: parseFloat(formData.area),
      so_phong: parseInt(formData.rooms),
      so_tang: parseInt(formData.floors)
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
      const data = await response.json();
      setPredictedPrice(data.gia_du_doan || `Lỗi: ${data.error}`);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
    }
  };

  return (
      <div className="input-form-page">
        <div className="input-form-wrapper">
          {!isSubmitted ? (
              <>
                <h1>Dự đoán giá nhà</h1>
                <form onSubmit={handleSubmit} className="input-form-grid">
                  <div className="input-field-group">
                    <label htmlFor="houseType">Loại nhà</label>
                    <select id="houseType" name="houseType" value={formData.houseType} onChange={handleChange} required>
                      <option value="">Chọn loại nhà</option>
                      {houseTypes.map((type) => (
                          <option key={type.id} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-field-group">
                    <label htmlFor="district">Quận/Huyện</label>
                    <select id="district" name="district" value={formData.district} onChange={handleChange} required>
                      <option value="">Chọn quận/huyện</option>
                      {districts.map((district) => (
                          <option key={district.id} value={district.value}>{district.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-field-group">
                    <label htmlFor="area">Diện tích (m²)</label>
                    <input type="number" id="area" name="area" value={formData.area} onChange={handleChange} required />
                  </div>
                  <div className="input-field-group">
                    <label htmlFor="rooms">Số phòng ngủ</label>
                    <input type="number" id="rooms" name="rooms" value={formData.rooms} onChange={handleChange} required />
                  </div>
                  <div className="input-field-group">
                    <label htmlFor="floors">Số tầng</label>
                    <input type="number" id="floors" name="floors" value={formData.floors} onChange={handleChange} required />
                  </div>
                  {/*<div className="input-field-group fade-in-up delay-2">
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

                   <div className="input-field-group fade-in-up delay-2">
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
                  </div>

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
                  </div>*/}

                          {/*<div className="input-field-group input-checkbox-group fade-in-up delay-3">
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
                  </div>*/}
                  <button type="submit" className="input-submit-btn">Dự Đoán Giá</button>
                </form>
              </>
          ) : (
              <div className="prediction-result fade-in">
                <h2>Kết quả dự đoán</h2>
                <p>{predictedPrice}</p>
                <button type="submit" className="input-submit-btn" onClick={() => setIsSubmitted(false)}>Thử lại</button>
              </div>
          )}
        </div>
      </div>
  );
};

export default InputForm;

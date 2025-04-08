import React, { useState, useEffect } from 'react';
import '../styles/InputForm.css';
import '../styles/animations.css';
import { useNavigate } from 'react-router-dom';
import { useHPredicted } from '../context/HPredictedContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const InputForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { predictHouse } = useHPredicted();
  const [houseTypes, setHouseTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    HouseType: '',
    district: '',
    area: '',
    rooms: '',
    floors: '',
    address: ''
  });


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

    if (!user) {
      toast.warning('Vui lòng đăng nhập để tiếp tục', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      navigate("/login");
      return;
    }

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
      console.log("Kết quả API:", data);

      const giaDuDoan = data.gia_du_doan || `Lỗi: ${data.error}`;
      const doChinhXac = data.confidence_score || null;

      setPredictedPrice(giaDuDoan);
      setConfidenceScore(doChinhXac);
      setIsSubmitted(true);

      const predictionPayload = {
        address: requestData.vi_tri,
        area: requestData.dien_tich,          // Diện tích
        bedrooms: requestData.so_phong,          // Số phòng
        floors: requestData.so_tang,          // Số tầng
        predictedPrice: giaDuDoan,            // Giá dự đoán
        confidenceScore: doChinhXac,          // Độ chính xác
        houseType: requestData.loai_nha,      // Loại nhà

      };
      const result = await predictHouse(predictionPayload);
      console.log("Kết quả lưu DB:", result);

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
                  <button type="submit" className="input-submit-btn">Dự Đoán Giá</button>
                </form>
              </>
          ) : (
              <div className="prediction-result fade-in">
                <h2>Kết quả dự đoán</h2>
                <p>Giá dự đoán: {predictedPrice} tỷ</p>
                {confidenceScore !== null && (
                    <p>Tỉ lệ chính xác: {confidenceScore}%</p>
                )}
                <button type="button" className="input-submit-btn" onClick={() => setIsSubmitted(false)}>Thử lại</button>
              </div>
          )}
        </div>
      </div>
  );
};

export default InputForm;

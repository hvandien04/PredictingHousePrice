import React, { useState, useEffect } from 'react';
import '../styles/Compare.css';

const Compare = () => {
  const [houses, setHouses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);

  const districtAdvantages = {
    "Quận 1": "Vị trí trung tâm, thuận tiện di chuyển, gần nhiều tiện ích như chợ Bến Thành, phố đi bộ Nguyễn Huệ, các tòa nhà văn phòng và trung tâm thương mại lớn.",
    "Quận 3": "Sôi động, hiện đại, gần trung tâm, có nhiều địa điểm du lịch và dịch vụ cao cấp, môi trường sống tiện nghi.",
    "Quận 4": "Gần trung tâm, kết nối thuận tiện qua nhiều cây cầu.",
    "Quận 5": "Giàu di sản văn hóa, gần Chợ Lớn và các công trình kiến trúc cổ, phù hợp cho những ai yêu thích sự hoài cổ và giao thoa văn hóa.",
    "Quận 7": "Hạ tầng hiện đại, khu đô thị cao cấp Phú Mỹ Hưng, không gian sống thoáng đãng, nhiều trung tâm thương mại và dịch vụ tiện ích.",
    "Quận 8": "Hệ thống kênh rạch tạo cảnh quan đẹp.",
    "Quận 10": "Khu vực nhộn nhịp, đa dạng về ẩm thực và văn hóa, gần nhiều chợ truyền thống và khu vui chơi.",
    "Quận 11": "Có công viên văn hóa Đầm Sen, nhiều tiện ích vui chơi, giải trí.",
    "Quận 12": "Đang phát triển mạnh, nhiều khu công nghiệp.",
    "Quận Bình Thạnh": "Gần trung tâm, nhiều khu vui chơi nổi tiếng như Văn Thánh, Bình Quới, Landmark 81, phù hợp cho những ai thích không gian sống xanh nhưng vẫn hiện đại.",
    "Quận Gò Vấp": "Đô thị hóa nhanh, có nhiều khu mua sắm, giải trí.",
    "Quận Phú Nhuận": "Vị trí trung tâm, di chuyển thuận tiện đến các quận khác, nhiều quán cà phê và nhà hàng nổi tiếng.",
    "Quận Tân Bình": "Có sân bay quốc tế Tân Sơn Nhất, thuận lợi cho những ai thường xuyên di chuyển bằng đường hàng không.",
    "Quận Tân Phú": "Đang phát triển mạnh, nhiều khu dân cư mới, trung tâm thương mại lớn.",
    "Quận Bình Tân": "Đông dân, nhiều khu công nghiệp và dịch vụ đa dạng.",
    "Quận Thủ Đức (TP. Thủ Đức)": "Khu đô thị sáng tạo, nhiều dự án công nghệ cao, tiềm năng phát triển lớn.",
    "Huyện Nhà Bè": "Không gian xanh, yên bình, môi trường sống thoải mái, thích hợp với những ai muốn tránh xa sự ồn ào của thành phố.",
    "Huyện Cần Giờ": "Gần biển, không khí trong lành, có khu dự trữ sinh quyển, phù hợp để nghỉ dưỡng hoặc đầu tư du lịch sinh thái."
  };

  const availableHouses = [
    {
      id: 1,
      image: '/img/house1.jpg',
      price: 6700000000,
      features: [
        'Diện tích: 100m²',
        'Số phòng ngủ: 3',
        'Số phòng tắm: 2',
        'Kết nối giao thông'
      ],
      location: 'Quận Bình Tân',
      type: 'Nhà mặt tiền',
      area: 64,
      rooms: 4,
      floors: 5
    },
    {
      id: 2,
      image: '/img/house2.jpg',
      price: 4300000000,
      features: [
        'Diện tích: 120m²',
        'Số phòng ngủ: 4',
        'Số phòng tắm: 3',
        'Gần trung tâm'
      ],
      location: 'Quận 12',
      type: 'Nhà hẻm',
      area: 60,
      rooms: 4,
      floors: 4
    },
    {
      id: 3,
      image: '/img/house3.jpg',
      price: 2800000000,
      features: [
        'Diện tích: 110m²',
        'Số phòng ngủ: 3',
        'Số phòng tắm: 2',
        'Có gara'
      ],
      location: 'Quận 3',
      type: 'Nhà phố',
      area: 110,
      rooms: 3,
      floors: 2
    },
    {
      id: 4,
      image: '/img/house4.jpg',
      price: 3500000000,
      features: [
        'Diện tích: 150m²',
        'Số phòng ngủ: 5',
        'Số phòng tắm: 4',
        'Có hồ bơi'
      ],
      location: 'Quận 9',
      type: 'Biệt thự',
      area: 150,
      rooms: 5,
      floors: 2
    }
  ];

  const handleAddHouse = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedHouse(null);
  };

  const handleAddSelectedHouse = () => {
    if (selectedHouse && houses.length < 3) {
      setHouses([...houses, selectedHouse]);
      handleCloseModal();
    }
  };

  const handleRemoveHouse = (index) => {
    const newHouses = houses.filter((_, i) => i !== index);
    setHouses(newHouses);
  };

  useEffect(() => {
    if (houses.length >= 2) {
      compareHouses();
    } else {
      setComparisonResults([]);
    }
  }, [houses]);

  const compareHouses = async () => {
    const results = [];

    // So sánh giá từng nhà với giá dự đoán
    for (let i = 0; i < houses.length; i++) {
      const house = houses[i];
      const houseLabel = `Nhà ${i + 1}`;

      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            loai_nha: house.type,
            vi_tri: house.location,
            dien_tich: house.area,
            so_phong: house.rooms,
            so_tang: house.floors,
          }),
        });

        const data = await response.json();
        const predictedPrice = data.gia_du_doan;
        
        if (house.price < predictedPrice * 0.9 * 1e9) {
          results.push(`${houseLabel} (${house.location}): Có thể là một món hời, nhưng hãy kiểm tra kỹ tình trạng nhà và pháp lý.`);
        } else if (house.price > predictedPrice * 1.1 * 1e9) {
          results.push(`${houseLabel} (${house.location}): Hãy cân nhắc thương lượng để có mức giá hợp lý hơn.`);
        } else {
          results.push(`${houseLabel} (${house.location}): Mức giá hợp lý theo thị trường.`);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API dự đoán giá:", error);
      }
    }

    // So sánh các nhà với nhau
    if (houses.length >= 2) {
      // Tìm nhà có diện tích lớn nhất và nhỏ nhất
      const sortedByArea = [...houses].sort((a, b) => b.area - a.area);
      results.push(`Nhà có diện tích lớn nhất: ${sortedByArea[0].location} (${sortedByArea[0].area}m²)`);
      
      // Tìm nhà có giá rẻ nhất
      const sortedByPrice = [...houses].sort((a, b) => a.price - b.price);
      results.push(`Nhà có giá tốt nhất: ${sortedByPrice[0].location} (${(sortedByPrice[0].price / 1e9).toFixed(2)} tỷ)`);
      
      // Tìm nhà có nhiều phòng nhất
      const sortedByRooms = [...houses].sort((a, b) => b.rooms - a.rooms);
      results.push(`Nhà có nhiều phòng nhất: ${sortedByRooms[0].location} (${sortedByRooms[0].rooms} phòng)`);
    }

    // Thêm thông tin ưu điểm từng quận
    houses.forEach((house, index) => {
      results.push(`Nhà ${index + 1} (${house.location}): ${districtAdvantages[house.location] || "Không có thông tin"}`);
    });

    setComparisonResults(results);
  };

  return (
    <div className="compare-container">
      <h1>So sánh bất động sản</h1>

      <div className="compare-grid">
        <div className="compare-content">
          {houses.map((house, index) => (
            <div key={`${house.id}-${index}`} className="house-column">
              <div className="house-image">
                <img src={house.image} alt="House" />
              </div>
              <div className="house-price">
                <span className="current-price">{house.price.toLocaleString()}đ</span>
              </div>
              <div className="house-features">
                {house.features.map((feature, i) => (
                  <div key={i} className="feature-item">{feature}</div>
                ))}
              </div>
              <button className="remove-house-btn" onClick={() => handleRemoveHouse(index)}>Xóa</button>
            </div>
          ))}

          {houses.length < 3 && (
            <div className="add-house-column">
              <button className="add-house-btn" onClick={handleAddHouse}>
                <span>+</span>
                <span>Thêm bất động sản</span>
              </button>
            </div>
          )}
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
                    {house.type} - {house.location} - {house.price.toLocaleString()}đ
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
                      <span className="detail-value">{selectedHouse.price.toLocaleString()}đ</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Diện tích:</span>
                      <span className="detail-value">{selectedHouse.area}m²</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Vị trí:</span>
                      <span className="detail-value">{selectedHouse.location}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Loại nhà:</span>
                      <span className="detail-value">{selectedHouse.type}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Số phòng:</span>
                      <span className="detail-value">{selectedHouse.rooms}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Số tầng:</span>
                      <span className="detail-value">{selectedHouse.floors}</span>
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

      {comparisonResults.length > 0 && (
        <div className="comparison-results">
          <h3>Kết quả so sánh:</h3>
          <ul>
            {comparisonResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Compare;
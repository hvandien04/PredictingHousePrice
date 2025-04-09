import React, { useState, useEffect } from 'react';
import '../styles/Compare.css';

const Compare = () => {
  const [houses, setHouses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const districtAdvantages = {
    "Quận 1": "Vị trí trung tâm, thuận tiện di chuyển, gần nhiều tiện ích như chợ Bến Thành, phố đi bộ Nguyễn Huệ, các tòa nhà văn phòng và trung tâm thương mại lớn.",
    "Quận 2 (TP. Thủ Đức)": "Khu đô thị sáng tạo, nhiều dự án công nghệ cao, tiềm năng phát triển lớn.",
    "Quận 3": "Sôi động, hiện đại, gần trung tâm, có nhiều địa điểm du lịch và dịch vụ cao cấp, môi trường sống tiện nghi.",
    "Quận 4": "Gần trung tâm, kết nối thuận tiện qua nhiều cây cầu.",
    "Quận 5": "Giàu di sản văn hóa, gần Chợ Lớn và các công trình kiến trúc cổ, phù hợp cho những ai yêu thích sự hoài cổ và giao thoa văn hóa.",
    "Quận 7": "Hạ tầng hiện đại, khu đô thị cao cấp Phú Mỹ Hưng, không gian sống thoáng đãng, nhiều trung tâm thương mại và dịch vụ tiện ích.",
    "Quận 8": "Hệ thống kênh rạch tạo cảnh quan đẹp.",
    "Quận 9 (TP. Thủ Đức)": "Khu đô thị sáng tạo, nhiều dự án công nghệ cao, tiềm năng phát triển lớn.",
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

  const [availableHouses, setAvailableHouses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/housescompare")
        .then(res => {
          if (!res.ok) throw new Error("Fetch error");
          return res.json();
        })
        .then(data => {
          const formatted = data.map((item) => ({
            id: item.pHouseID,
            title: item.title || "Chưa có tiêu đề",
            houseType: item.houseType || "Không xác định",
            area: item.area ?? 0,
            address: item.address || "Không xác định",
            floors: item.floors ?? 0,
            bedrooms: item.bedrooms ?? 0,
            legalStatus: item.legalstatus || "Không rõ",
            price: (item.price || 0) * 1e9,
            image: item.image ? `/img/${item.image}` : "/img/default.jpg",
            features: [
              `Diện tích: ${item.area ?? 0}m²`,
              `Số phòng ngủ: ${item.bedrooms ?? 0}`,
              `Tình trạng pháp lý: ${item.legalstatus || "Không rõ"}`,
              `Số tầng: ${item.floors ?? 0}`
            ],
            location: item.address || "Không xác định",
            type: item.title || "Chưa có tiêu đề"
          }));
          setAvailableHouses(formatted);
        })
        .catch(err => console.error("Lỗi khi fetch houses:", err));
  }, []);

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
    if (!houses || houses.length === 0) {
      console.error("Danh sách nhà trống.");
      return;
    }

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
            loai_nha: house.houseType,
            vi_tri: house.location,
            dien_tich: house.area,
            so_phong: house.bedrooms,
            so_tang: house.floors,
          }),
        });

        const data = await response.json();
        const predictedPrice = data.gia_du_doan;

        //  Log giá thực tế và dự đoán
        console.log(` ${houseLabel} (${house.location})`);
        console.log(`Giá thực tế: ${house.price.toLocaleString()} đ`);
        console.log(`Giá dự đoán: ${(predictedPrice * 1e9).toLocaleString()} đ`);

        if (house.price < predictedPrice * 0.9 * 1e9) {
          results.push(`${houseLabel} (${house.location}): Có thể là một món hời, nhưng hãy kiểm tra kỹ tình trạng nhà và pháp lý.`);
        } else if (house.price > predictedPrice * 1.1 * 1e9) {
          results.push(`${houseLabel} (${house.location}): Hãy cân nhắc thương lượng để có mức giá hợp lý hơn.`);
        } else {
          results.push(`${houseLabel} (${house.location}): Mức giá hợp lý theo thị trường.`);
        }
      } catch (error) {
        console.error(" Lỗi khi gọi API dự đoán giá:", error);
      }
    }


    if (houses.length === 0) {
      console.error("Danh sách nhà trống!");
    } else {
      houses.sort((a, b) => a.area - b.area);

      let smallest = houses[0]; // Nhà nhỏ nhất
      let largest = houses[houses.length - 1]; // Nhà lớn nhất

      // So sánh diện tích & số phòng
      if (largest.bedrooms < smallest.bedrooms) {
        results.push(`Nhà ${houses.indexOf(largest) + 1} (${largest.location}) có không gian rộng nhưng ít phòng (${largest.bedrooms} phòng), phù hợp cho gia đình thích thiết kế mở.`);
      }
      if (smallest.bedrooms < largest.bedrooms) {
        results.push(`Nhà ${houses.indexOf(smallest) + 1} (${smallest.location}) có nhiều phòng hơn (${smallest.bedrooms} phòng), thích hợp cho gia đình đông người.`);
      }

      // Nhà có nhiều phòng nhất
      let maxRooms = Math.max(...houses.map(h => h.bedrooms));
      let minRooms = Math.min(...houses.map(h => h.bedrooms));

      let mostRoomsHouses = houses.filter(h => h.bedrooms === maxRooms);
      let leastRoomsHouses = houses.filter(h => h.bedrooms === minRooms);

      if (mostRoomsHouses.length > 0) {
        let locations = mostRoomsHouses.map(h => `${houses.indexOf(h) + 1} (${h.location})`).join(", Nhà ");
        results.push(`Nhà ${locations} có nhiều phòng (${maxRooms} phòng), thích hợp cho gia đình đông người hoặc cho thuê.`);
      }

      if (leastRoomsHouses.length > 0) {
        let locations = leastRoomsHouses.map(h => `${houses.indexOf(h) + 1} (${h.location})`).join(", Nhà ");
        results.push(`Nhà ${locations} ít phòng (${minRooms} phòng), phù hợp cho gia đình nhỏ hoặc đơn giản hóa không gian sống.`);
      }

      // So sánh số tầng
      let maxFloors = Math.max(...houses.map(h => h.floors));
      let minFloors = Math.min(...houses.map(h => h.floors));

      let tallestHouses = houses.filter(h => h.floors === maxFloors);
      let shortestHouses = houses.filter(h => h.floors === minFloors);

      if (tallestHouses.length > 0) {
        let locations = tallestHouses.map(h => `${houses.indexOf(h) + 1} (${h.location})`).join(", Nhà ");
        results.push(`Nhà ${locations} có nhiều tầng (${maxFloors} tầng), phù hợp cho gia đình lớn hoặc có thể cho thuê.`);
      }

      if (shortestHouses.length > 0) {
        let locations = shortestHouses.map(h => `${houses.indexOf(h) + 1} (${h.location})`).join(", Nhà ");
        results.push(`Nhà ${locations} ít tầng (${minFloors} tầng), thuận tiện di chuyển, phù hợp cho người già hoặc trẻ nhỏ.`);
      }
    }

    houses.forEach((house, index) => {
      results.push(`Nhà ${index + 1} (${house.location}): ${districtAdvantages[house.location] || "Không có thông tin"}`);
    });

    setComparisonResults(results);
  };

  // Lọc danh sách theo tên, loại nhà hoặc vị trí
  const filteredHouses = availableHouses.filter(house =>
      house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.location.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
              {/* Tìm kiếm nhà */}
              <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, loại nhà, vị trí..."
                  className="modal-search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Danh sách nhà đã lọc */}
              <select
                  className="modal-select"
                  value={selectedHouse?.id?.toString() || ''}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const house = availableHouses.find(h => h.id.toString() === selectedId);
                    setSelectedHouse(house);
                  }}
              >
                <option value="">Chọn nhà</option>
                {filteredHouses.map(house => (
                    <option key={house.id} value={house.id.toString()}>
                      {house.type} - {house.location} - {house.price.toLocaleString()}đ
                    </option>
                ))}
              </select>

              {/* Hiển thị chi tiết nhà được chọn */}
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
                        <span className="detail-value">{selectedHouse.bedrooms}</span>
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
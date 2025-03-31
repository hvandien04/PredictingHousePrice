import React, { useState, useEffect } from 'react';
import '../styles/Compare.css';

const Compare = () => {
  const [houses, setHouses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
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
    }
  ];

  const handleAddHouse = () => {
    setShowAddForm(true);
  };

  const handleSelectHouse = (house) => {
    if (houses.length < 2) {
      setHouses([...houses, house]);
    }
    setShowAddForm(false);
  };

  const handleRemoveHouse = (index) => {
    const newHouses = houses.filter((_, i) => i !== index);
    setHouses(newHouses);
  };

  useEffect(() => {
    if (houses.length === 2) {
      compareHouses();
    } else {
      setComparisonResults([]);
    }
  }, [houses]);

  const compareHouses = async () => {
    const results = [];
    const [house1, house2] = houses;

    for (let i = 0; i < houses.length; i++) {
      const house = houses[i];
      const houseLabel = i === 0 ? "Nhà 1" : "Nhà 2";

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
        console.log(`${houseLabel} (${house.location}) - Giá dự đoán: ${predictedPrice} tỷ`);
        console.log(`${houseLabel} (${house.location}) - Giá thực: ${house.price}`);

        if (house.price < predictedPrice * 0.9 * 1e9) {
          results.push(`${houseLabel} (${house.location}): Có thể là một món hời, nhưng hãy kiểm tra kỹ tình trạng nhà và pháp lý.`);
        } else if (house.price > predictedPrice * 1.1* 1e9) {
          results.push(`${houseLabel} (${house.location}): Hãy cân nhắc thương lượng để có mức giá hợp lý hơn.`);
        } else {
          results.push(`${houseLabel} (${house.location}): Mức giá hợp lý theo thị trường, bạn hãy xem xét các yếu tố khác như vị trí và tiện ích.`);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API dự đoán giá:", error);
      }
    }

    if (house1.area > house2.area && house1.rooms < house2.rooms) {
      results.push("Nhà 1 có không gian rộng rãi, phù hợp cho gia đình thích thiết kế mở, ít phòng.");
    } else if (house1.area < house2.area && house1.rooms > house2.rooms) {
      results.push("Nhà 1 có thể hơi chật chội, nhưng phù hợp với gia đình đông người cần nhiều phòng riêng.");
    }

    if (house1.area < house2.area && house1.rooms > house2.rooms) {
      results.push("Nhà 2 có không gian rộng rãi, phù hợp cho gia đình thích thiết kế mở, ít phòng.");
    } else if (house1.area > house2.area && house1.rooms < house2.rooms) {
      results.push("Nhà 2 có thể hơi chật chội, nhưng phù hợp với gia đình đông người cần nhiều phòng riêng.");
    }

    if (house1.rooms !== house2.rooms) {
      results.push(house1.rooms > house2.rooms
          ? `Nhà 1 (${house1.location}) nhiều phòng phù hợp hơn nếu bạn cần không gian cho nhiều thành viên hoặc có kế hoạch cho thuê.`
          : `Nhà 2 (${house2.location}) nhiều phòng phù hợp hơn nếu bạn cần không gian cho nhiều thành viên hoặc có kế hoạch cho thuê.`);
    }

    if (house1.floors !== house2.floors) {
      if (house1.floors > house2.floors) {
        results.push(`Nhà 1 (${house1.location}) nhiều tầng thích hợp cho gia đình lớn hoặc có thể cho thuê một phần.`);
        results.push(`Nhà 2 (${house2.location}) ít tầng dễ di chuyển hơn, đặc biệt nếu có người già hoặc trẻ nhỏ.`);
      } else {
        results.push(`Nhà 2 (${house2.location}) nhiều tầng thích hợp cho gia đình lớn hoặc có thể cho thuê một phần.`);
        results.push(`Nhà 1 (${house1.location}) ít tầng dễ di chuyển hơn, đặc biệt nếu có người già hoặc trẻ nhỏ.`);
      }
    }

    if (house1.location !== house2.location) {
      results.push(`Nhà 1 (${house1.location}): ${districtAdvantages[house1.location] || "Không có thông tin"}`);
      results.push(`Nhà 2 (${house2.location}): ${districtAdvantages[house2.location] || "Không có thông tin"}`);
    }

    setComparisonResults(results);
  };

  return (
      <div className="compare-container">
        <h1>So sánh bất động sản</h1>

        <div className="compare-grid">
          <div className="compare-content">
            {houses.map((house, index) => (
                <div key={house.id} className="house-column">
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

            {houses.length < 2 && (
                <div className="add-house-column">
                  <button className="add-house-btn" onClick={handleAddHouse}>
                    <span>+</span>
                    <span>Thêm bất động sản</span>
                  </button>
                </div>
            )}
          </div>
        </div>

        {showAddForm && (
            <div className="add-house-modal">
              <h3>Chọn một căn nhà</h3>
              {availableHouses.map(house => (
                  <div key={house.id} className="modal-house" onClick={() => handleSelectHouse(house)}>
                    <img src={house.image} alt="House" />
                    <p>{house.price.toLocaleString()}đ</p>
                  </div>
              ))}
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
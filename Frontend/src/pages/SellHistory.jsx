import React from 'react';
import '../styles/SellHistory.css';

const SellHistory = () => {
  // Mock data - sẽ được thay thế bằng dữ liệu thực từ API
  const sellHistory = [
    {
      id: 1,
      title: 'Nhà phố cao cấp Quận 7',
      price: '5.2 tỷ',
      location: 'Quận 7',
      type: 'Nhà phố',
      area: '120m²',
      bedrooms: 4,
      bathrooms: 3,
      status: 'Đang bán',
      postedDate: '2024-03-26',
      views: 245,
      inquiries: 12
    },
    {
      id: 2,
      title: 'Căn hộ view sông Quận 2',
      price: '3.8 tỷ',
      location: 'Quận 2',
      type: 'Chung cư',
      area: '85m²',
      bedrooms: 3,
      bathrooms: 2,
      status: 'Đã bán',
      postedDate: '2024-03-20',
      views: 189,
      inquiries: 8
    },
    {
      id: 3,
      title: 'Biệt thự biển Phú Quốc',
      price: '12.5 tỷ',
      location: 'Phú Quốc',
      type: 'Biệt thự',
      area: '250m²',
      bedrooms: 5,
      bathrooms: 4,
      status: 'Đang bán',
      postedDate: '2024-03-15',
      views: 567,
      inquiries: 25
    }
  ];

  return (
    <div className="sell-history-container">
      <div className="sell-history-header">
        <h1>Lịch Sử Đăng Bán</h1>
        <div className="sell-history-stats">
          <div className="stat-card">
            <h3>Tổng số tin đăng</h3>
            <p>{sellHistory.length}</p>
          </div>
          <div className="stat-card">
            <h3>Đang bán</h3>
            <p>{sellHistory.filter(item => item.status === 'Đang bán').length}</p>
          </div>
          <div className="stat-card">
            <h3>Đã bán</h3>
            <p>{sellHistory.filter(item => item.status === 'Đã bán').length}</p>
          </div>
        </div>
      </div>

      <div className="sell-history-list">
        {sellHistory.map((item) => (
          <div key={item.id} className="sell-history-item">
            <div className="sell-history-main">
              <div className="sell-history-info">
                <h3>{item.title}</h3>
                <p className="sell-history-price">{item.price}</p>
                <div className="sell-history-details">
                  <span>{item.location}</span>
                  <span>{item.area}</span>
                  <span>{item.bedrooms} PN</span>
                  <span>{item.bathrooms} WC</span>
                </div>
              </div>
              <div className="sell-history-status">
                <span className={`status-badge ${item.status === 'Đang bán' ? 'active' : 'sold'}`}>
                  {item.status}
                </span>
                <p className="posted-date">Đăng ngày: {new Date(item.postedDate).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
            <div className="sell-history-metrics">
              <div className="metric">
                <i className="fas fa-eye"></i>
                <span>{item.views} lượt xem</span>
              </div>
              <div className="metric">
                <i className="fas fa-comments"></i>
                <span>{item.inquiries} lượt liên hệ</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellHistory; 
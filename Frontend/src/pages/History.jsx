import React from 'react';
import '../styles/History.css';

const History = () => {
  // Mock data - sẽ được thay thế bằng dữ liệu thực từ API
  const predictions = [
    {
      id: 1,
      date: '2024-03-21',
      location: 'Quận 7, TP.HCM',
      area: '100m²',
      bedrooms: 3,
      predictedPrice: '2.390.000.000đ',
      accuracy: '99.5%',
      status: 'success'
    },
    {
      id: 2,
      date: '2024-03-20',
      location: 'Quận 2, TP.HCM',
      area: '120m²',
      bedrooms: 4,
      predictedPrice: '3.100.000.000đ',
      accuracy: '96.7%',
      status: 'warning'
    },
    {
      id: 3,
      date: '2024-03-19',
      location: 'Quận 9, TP.HCM',
      area: '80m²',
      bedrooms: 2,
      predictedPrice: '1.800.000.000đ',
      accuracy: '97.3%',
      status: 'success'
    }
  ];

  return (
    <div className="history-container">
      <h1>Lịch Sử Dự Đoán</h1>
      
      <div className="history-stats">
        <div className="stat-card">
          <h3>Tổng số dự đoán</h3>
          <p>{predictions.length}</p>
        </div>
        <div className="stat-card">
          <h3>Độ chính xác trung bình</h3>
          <p>97.8%</p>
        </div>
        <div className="stat-card">
          <h3>Dự đoán gần nhất</h3>
          <p>{predictions[0].date}</p>
        </div>
      </div>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Vị trí</th>
              <th>Diện tích</th>
              <th>Phòng ngủ</th>
              <th>Giá dự đoán</th>
              <th>Độ chính xác</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map(prediction => (
              <tr key={prediction.id} className={`status-${prediction.status}`}>
                <td>{prediction.date}</td>
                <td>{prediction.location}</td>
                <td>{prediction.area}</td>
                <td>{prediction.bedrooms}</td>
                <td className="price">{prediction.predictedPrice}</td>
                <td className={`accuracy ${prediction.accuracy > 97 ? 'high' : 'medium'}`}>
                  {prediction.accuracy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="history-pagination">
        <button className="pagination-btn" disabled>&lt; Trước</button>
        <span className="page-number active">1</span>
        <span className="page-number">2</span>
        <span className="page-number">3</span>
        <button className="pagination-btn">Sau &gt;</button>
      </div>
    </div>
  );
};

export default History; 
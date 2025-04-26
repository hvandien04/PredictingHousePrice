import React, { useEffect, useState } from 'react';
import '../styles/History.css';
import { useHPredicted } from '../context/HPredictedContext';

const PredictionTable = ({ predictions }) => {
  return (
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
          {predictions.map((prediction, index) => (
            <tr key={prediction.id || index} className={`status-${prediction.status}`}>
              <td>{formatArrayDate(prediction.date)}</td>
              <td>{prediction.address}</td>
              <td>{prediction.area}</td>
              <td>{prediction.bedrooms}</td>
              <td className="price">{prediction.predictedPrice} Tỷ</td>
              <td className={`accuracy ${parseFloat(prediction.confidenceScore) > 97 ? 'high' : 'medium'}`}>
                {prediction.confidenceScore}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const formatArrayDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3) return 'Không xác định';
  const [year, month, day] = dateArray;
  const formattedDay = day.toString().padStart(2, '0');
  const formattedMonth = month.toString().padStart(2, '0');
  return `${formattedDay}-${formattedMonth}-${year}`;
};


const History = () => {
  const { historyPredict } = useHPredicted();
  const [predictions, setPredictions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const predictionsPerPage = 5;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await historyPredict();
        setPredictions(response || []);
        setLoading(false);
      } catch (err) {
        setError('Có lỗi xảy ra khi tải dữ liệu');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(predictions.length / predictionsPerPage);
  const startIndex = (currentPage - 1) * predictionsPerPage;
  const currentPredictions = predictions.slice(startIndex, startIndex + predictionsPerPage);

  const handlePageClick = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };
  const calculateAverageAccuracy = () => {
    if (predictions.length === 0) return 0;
    const totalAccuracy = predictions.reduce((acc, prediction) => acc + parseFloat(prediction.confidenceScore), 0);
    return (totalAccuracy / predictions.length).toFixed(2);
  };
  const averageAccuracy = calculateAverageAccuracy();

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
          <p>{averageAccuracy}%</p>
        </div>
        <div className="stat-card">
          <h3>Dự đoán gần nhất</h3>
          <p>{formatArrayDate(predictions[0]?.date) || 'Chưa có'}</p>
        </div>
      </div>

      <PredictionTable predictions={currentPredictions} />

      <div className="history-pagination">
        <button
          className="pagination-btn"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &lt; Trước
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <span
            key={i}
            className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
            onClick={() => handlePageClick(i + 1)}
          >
            {i + 1}
          </span>
        ))}
        <button
          className="pagination-btn"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau &gt;
        </button>
      </div>
    </div>
  );
};

export default History;

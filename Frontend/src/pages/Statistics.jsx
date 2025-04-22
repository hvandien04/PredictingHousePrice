import React, { useState, useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import '../styles/Statistics.css';

const Statistics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPredictions: 0,
    recentPredictions: [],
    priceDistribution: [
      { range: 'Dưới 2 tỷ', count: 0 },
      { range: '2-4 tỷ', count: 0 },
      { range: '4-6 tỷ', count: 0 },
      { range: '6-8 tỷ', count: 0 },
      { range: '8-10 tỷ', count: 0 },
      { range: 'Trên 10 tỷ', count: 0 },
    ],
    timelineData: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/user/dashboard', {
        method: 'GET',
        credentials: 'include',
      });

      const text = await response.text();
      if (!response.ok) {
        throw new Error(`Failed to fetch statistics: ${response.status} ${response.statusText}`);
      }

      const data = JSON.parse(text);
      setStats({
        totalPredictions: data.totalPredictions,
        recentPredictions: data.recentPredictions,
        priceDistribution: data.priceDistribution,
        timelineData: data.timelineData,
      });
    } catch (error) {
      console.error('Lỗi khi lấy thống kê:', error);
      setError('Không thể lấy dữ liệu thống kê');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStatistics();
    } else {
      setError('Vui lòng đăng nhập để xem thống kê');
      setIsLoading(false);
    }
  }, [user]);

  const formatYAxis = (tick) => `${tick}`;

  if (isLoading) {
    return (
      <div className="statistics-loading">
        <div className="loader"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h1>Thống Kê Dự Đoán Cá Nhân</h1>
        <div className="statistics-summary">
          <div className="summary-card">
            <h3>Tổng số dự đoán</h3>
            <p className="number">{stats.totalPredictions}</p>
          </div>
          <div className="summary-card">
            <h3>Dự đoán trong tháng</h3>
            <p className="number">{stats.recentPredictions.length}</p>
          </div>
        </div>
      </div>

      <div className="statistics-grid">
        <div className="chart-container">
          <h2>Phân Bố Giá Nhà</h2>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={stats.priceDistribution}
                  margin={{ top: 10, right: 20, left: 5, bottom: 20 }} // tăng left để chừa chỗ cho nhãn Y
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="range"
                    label={{
                      value: 'Khoảng giá',
                      position: 'bottom',
                      offset: 27,
                      style: { fontSize: '0.9rem' }
                    }}
                  />
                  <YAxis
                    label={{
                      value: 'Số lượng dự đoán',
                      angle: -90,
                      position: 'insideLeft', // hoặc outsideLeft nếu muốn ra ngoài
                      dy: 40,
                      style: { fontSize: '0.9rem' }
                    }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3498db" name="Số lượng" />
                </BarChart>
              </ResponsiveContainer>
            </div>

        </div>

        <div className="chart-container">
          <h2>Xu Hướng Giá Trung Bình</h2>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={stats.timelineData}
                margin={{ top: 10, right: 20, left: 5, bottom: 30 }} // giống với chart trên
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  label={{
                    value: 'Thời gian',
                    position: 'bottom',
                    offset: 27,
                    style: { fontSize: '0.9rem' }
                  }}
                />
                <YAxis
                  label={{
                    value: 'Giá trung bình (tỷ)',
                    angle: -90,
                    position: 'insideLeft',
                    dy: 40,
                    style: { fontSize: '0.9rem' }
                  }}
                  tickFormatter={formatYAxis}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="averagePrice"
                  stroke="#2ecc71"
                  name="Giá trung bình (tỷ)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        <div className="recent-predictions">
          <h2>Dự Đoán Gần Đây</h2>
          <div className="predictions-list">
            {stats.recentPredictions.map((prediction, index) => (
              <div key={index} className="prediction-item">
                <div className="prediction-info">
                  <h4>{prediction.location}</h4>
                  <p>{prediction.type}</p>
                </div>
                <div className="prediction-details">
                  <span className="price">{prediction.price} tỷ</span>
                  <span className="date">{prediction.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
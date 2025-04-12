import React, { useState, useEffect } from 'react';
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
  ResponsiveContainer
} from 'recharts';
import '../styles/Statistics.css';

const Statistics = () => {
  const [stats, setStats] = useState({
    totalPredictions: 0,
    recentPredictions: [],
    priceDistribution: [
      { range: "Dưới 2 tỷ", count: 0 },
      { range: "2-4 tỷ", count: 0 },
      { range: "4-6 tỷ", count: 0 },
      { range: "6-8 tỷ", count: 0 },
      { range: "8-10 tỷ", count: 0 },
      { range: "Trên 10 tỷ", count: 0 },
    ],
    timelineData: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStatistics = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching statistics...");
      const response = await fetch('http://localhost:8080/api/user/dashboard', {
        method: 'GET',
        credentials: 'include',
      });

      const text = await response.text();
      console.log('Statistics - Status:', response.status);
      console.log('Statistics - Raw response:', text);

      if (!response.ok) {
        throw new Error(`Failed to fetch statistics: ${response.status} ${response.statusText}`);
      }

      const data = JSON.parse(text);
      setStats({
        totalPredictions: data.totalPredictions,
        recentPredictions: data.recentPredictions,
        priceDistribution: data.priceDistribution,
        timelineData: data.timelineData
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Lỗi khi lấy thống kê:', error);
      setError('Không thể lấy dữ liệu thống kê');
      setIsLoading(false);
    }
  };

  const loginAndFetch = async () => {
    try {
      console.log("Logging in...");
      const loginResponse = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'nguyenvanb@gmail.com', password: '123456ABC' }),
      });

      const loginText = await loginResponse.text();
      console.log('Login - Status:', loginResponse.status);
      console.log('Login - Response:', loginText);

      if (!loginResponse.ok) {
        throw new Error('Login failed');
      }

      await fetchStatistics();
    } catch (error) {
      console.error('Login error:', error);
      setError('Không thể đăng nhập');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loginAndFetch();
  }, []);

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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.priceDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3498db" name="Số lượng" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h2>Xu Hướng Giá Trung Bình</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
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
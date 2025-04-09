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
import { useAuth } from '../context/AuthContext';
import '../styles/Statistics.css';

// Dữ liệu demo
const demoData = {
  totalPredictions: 156,
  recentPredictions: [
    {
      location: "Quận 7, TP.HCM",
      type: "Nhà phố",
      price: "5.2",
      date: "20/03/2024"
    },
    {
      location: "Quận 2, TP.HCM",
      type: "Căn hộ",
      price: "3.8",
      date: "19/03/2024"
    },
    {
      location: "Quận Bình Thạnh, TP.HCM",
      type: "Nhà phố",
      price: "4.5",
      date: "18/03/2024"
    },
    {
      location: "Quận 9, TP.HCM",
      type: "Đất nền",
      price: "2.8",
      date: "17/03/2024"
    },
    {
      location: "Quận Tân Bình, TP.HCM",
      type: "Căn hộ",
      price: "3.2",
      date: "16/03/2024"
    },
    {
      location: "Quận 1, TP.HCM",
      type: "Căn hộ cao cấp",
      price: "8.5",
      date: "15/03/2024"
    }
  ],
  priceDistribution: [
    { range: "Dưới 2 tỷ", count: 25 },
    { range: "2-4 tỷ", count: 45 },
    { range: "4-6 tỷ", count: 35 },
    { range: "6-8 tỷ", count: 20 },
    { range: "8-10 tỷ", count: 15 },
    { range: "Trên 10 tỷ", count: 16 }
  ],
  timelineData: [
    { date: "T1/2024", averagePrice: 4.2 },
    { date: "T2/2024", averagePrice: 4.5 },
    { date: "T3/2024", averagePrice: 4.8 },
    { date: "T4/2024", averagePrice: 4.6 },
    { date: "T5/2024", averagePrice: 4.9 },
    { date: "T6/2024", averagePrice: 5.1 }
  ]
};

const Statistics = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(demoData); // Sử dụng dữ liệu demo
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true);
      try {
        // Tạm thời comment lại phần gọi API
        // const response = await fetch(`http://127.0.0.1:5000/statistics/${user.id}`);
        // const data = await response.json();
        // setStats(data);
        
        // Giả lập delay để test loading
        setTimeout(() => {
          setStats(demoData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Lỗi khi lấy thống kê:', error);
        setError('Không thể lấy dữ liệu thống kê');
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchStatistics();
    }
  }, [user?.id]);

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
        <h1>Thống Kê Dự Đoán</h1>
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
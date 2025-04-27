import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/Home.css';
import banner from '../assets/banner.jpg';
import featuresCenter from '../assets/features-center.png';
import { FaCalculator, FaHistory, FaRobot, FaBalanceScale } from 'react-icons/fa';
import NewsList from '../components/NewsList';
import {houseService} from '../utils/predictHouseAPI';
import { use } from 'react';

const Home = () => {

  const testimonials = [
    {
      name: "TRẦN LAM",
      content: "Chúng tôi rất hài lòng về sản phẩm của công ty. Cảm ơn bạn đã mang đến sản phẩm tuyệt vời như vậy. Chúng tôi sẽ tiếp tục"
    },
    {
      name: "HUỲNH ĐÔNG",
      content: "Chúng tôi rất hài lòng về sản phẩm của công ty. Cảm ơn bạn đã mang đến sản phẩm tuyệt vời như vậy. Chúng tôi sẽ tiếp tục"
    },
    {
      name: "NGỌC DƯƠNG",
      content: "Chúng tôi rất hài lòng về sản phẩm của công ty. Cảm ơn bạn đã mang đến sản phẩm tuyệt vời như vậy. Chúng tôi sẽ tiếp tục"
    },
    {
      name: "HUỲNH AN",
      content: "Chúng tôi rất hài lòng về sản phẩm của công ty. Cảm ơn bạn đã mang đến sản phẩm tuyệt vời như vậy. Chúng tôi sẽ tiếp tục"
    },
    {
      name: "NGỌC ĐƯƠNG",
      content: "Chúng tôi rất hài lòng về sản phẩm của công ty. Cảm ơn bạn đã mang đến sản phẩm tuyệt vời như vậy. Chúng tôi sẽ tiếp tục"
    }
  ];

  const settings = {
    dots: true,  // Hiển thị các chấm điều hướng
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 1,
    arrows: true,  
    autoplay: false,
    className: "testimonials-slider",
    responsive: [
      {
        breakpoint: 768, // Khi màn hình ≤ 768px
        settings: {
          slidesToShow: 1, // Chỉ hiển thị 1 slide
          slidesToScroll: 1,
          centerMode: false, // Tắt chế độ center
          variableWidth: false, // Đảm bảo slide chiếm full width
          adaptiveHeight: true, // Thêm dòng này
          arrows: false // Tắt mũi tên trên mobile
        }
      }
    ],
  };
  
  const [recentPredictions, setRecentPredictions] = useState([]);
  const formatArrayDate = (dateArray) => {
    if (!Array.isArray(dateArray) || dateArray.length < 3) return 'Không xác định';
    const [year, month, day] = dateArray;
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  useEffect(() => {
    const fetchRecentPredictions = async () => {
      
      try {
        const response = await houseService.historyHome();
        setRecentPredictions(response);
      } catch (error) {
        console.error("Error fetching recent predictions:", error);
      }
    }
    fetchRecentPredictions();
  }, []);
  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">HousePredict</h1>
        <p className="home-slogan">Dự đoán giá nhà chính xác với AI</p>
        <Link to="/input" className="predict-button">
          Dự đoán ngay!
        </Link>
      </div>
      <div className="home-banner">
        <img src={banner} alt="Statistics Banner" />
      </div>

      <section className="features">
        <h2>Tính năng chính</h2>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="features-layout">
          <div className="features-left">
            <div className="feature-card">
              <div className="feature-icon">
                <FaCalculator size={40} color="#007bff" />
              </div>
              <h3>Dự đoán giá nhà</h3>
              <p>Sử dụng AI để dự đoán chính xác giá nhà dựa trên các thông số quan trọng</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaHistory size={40} color="#007bff" />
              </div>
              <h3>Lịch sử tra cứu</h3>
              <p>Lưu trữ và quản lý lịch sử các lần dự đoán của bạn</p>
            </div>
          </div>

          <div className="features-center">
            <div className="center-logo">
              <img src={featuresCenter} alt="Features" />
            </div>
          </div>

          <div className="features-right">
            <div className="feature-card">
              <div className="feature-icon">
                <FaRobot size={40} color="#007bff" />
              </div>
              <h3>AI Thông minh</h3>
              <p>Công nghệ AI tiên tiến, học máy chính xác cao</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FaBalanceScale size={40} color="#007bff" />
              </div>
              <h3>So sánh giá nhà</h3>
              <p>So sánh giá nhà giữa các khu vực và thời điểm khác nhau</p>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-predictions">
        <h2>Dự đoán gần đây</h2>
        <div className="predictions-grid">
          {recentPredictions.map((prediction, index) => (
            <div key={index} className="prediction-card">
              <div className="prediction-header">
                <i className="fa-solid fa-location-dot"></i>
                <h3>{prediction.address}</h3>
              </div>
              <div className="prediction-details">
                <p><i className="fa-solid fa-money-bill-wave"></i> {prediction.predictedPrice} tỷ</p>
                <p><i className="fa-solid fa-ruler-combined"></i> {prediction.area} m²</p>
                <p><i className="fa-solid fa-calendar"></i>{formatArrayDate(prediction.date)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NewsList />


      <section className="testimonials">
        <h2>Nhận Xét Của Khách Hàng</h2>
        <div className="testimonials-container">
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-slide">
                <div className="testimonial-circle">
                  <div className="testimonial-content">
                    <h3>{testimonial.name}</h3>
                    <p>{testimonial.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      
    </div>
  );
};

export default Home; 
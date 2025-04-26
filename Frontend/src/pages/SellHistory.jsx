import React, { useEffect, useState } from 'react';
import '../styles/SellHistory.css';
import { useHPredicted } from '../context/HPredictedContext';
import { toast } from 'react-toastify';

const SellHistorylist = ({ sellHistory, handleCancelPost, handleRPost }) => {
  const [dropdownOpen, setDropdownOpen] = useState(null); 

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleCancel = (id) => {
    handleCancelPost(id);
    setDropdownOpen(null);
  };
  const handleRepost = (id) => {
    handleRPost(id);
    setDropdownOpen(null);
  };

  return (
    <div className="sell-history-list">
      {sellHistory.map((item,index) => (
        <div key={item.id || index} className="sell-history-item">
          <div className="sell-history-main">
            <div className="sell-history-info">
              <h3>{item.title}</h3>
              <p className="sell-history-price">{item.price} Tỷ</p>
              <div className="sell-history-details">
                <span>{item.address}</span>
                <span>{item.area}</span>
                <span>{item.bedrooms} PN</span>
                <span>{item.bathrooms} WC</span>
              </div>
            </div>
            <div className="sell-history-status">
              
              <span className={`status-badge ${item.state === 'Đang bán' ? 'approved' : item.state === 'Chờ duyệt' ? 'pending'  : item.state === 'Tạm ngưng' ? 'canceled' : ''}`}>
                {item.state}
              </span>
              {/* Nút 3 chấm và dropdown menu */}
              <div className="dropdown-container-sell-history">
                <button 
                  className="dropdown-toggle-sell-history" 
                  onClick={() => toggleDropdown(item.phouseID)}
                >
                  ⋮
                </button>
                {dropdownOpen === item.phouseID && (
                    <div className="dropdown-menu-sell-history">
                    {item.state === 'Tạm ngưng' && (
                      <button
                        className="dropdown-item-sell-history"
                        onClick={() => handleRepost(item.phouseID)}
                      >
                        Đăng lại
                      </button>
                    )}
                    {item.state === 'Đang bán' && (
                      <button
                        className="dropdown-item-sell-history"
                        onClick={() => handleCancel(item.phouseID)}
                      >
                        Hủy đăng bài
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


const SellHistory = () => {
  const { historySell, updateState  } = useHPredicted();
  const [sellHistory, setSellHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await historySell();
          setSellHistory(response || []);
          setLoading(false);
        } catch (err) {
          setError('Có lỗi xảy ra khi tải dữ liệu');
          setLoading(false);
        }
      };
      fetchData();
    }, []);
  
    const handleCancelPost = async (phouseID) => {
      try {
        const data = { state: 'Tạm ngưng' };
        await updateState(phouseID, data);
        toast.success('Hủy đăng bài thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSellHistory((prev) =>
          prev.map((item) =>
            item.phouseID === phouseID ? { ...item, state: 'Tạm ngưng' } : item
          )
        );
      } catch (err) {
        setError('Có lỗi khi hủy đăng bài');
      }
    };
    const handleRPost = async (phouseID) => {
      try {
        const data = { state: 'Đang bán' };
        await updateState(phouseID, data);
        toast.success('Đăng lại bài thành công!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setSellHistory((prev) =>
          prev.map((item) =>
            item.phouseID === phouseID ? { ...item, state: 'Đang bán' } : item
          )
        );
      } catch (err) {
        setError('Có lỗi khi đăng bài');
      }
    };
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
            <p>{sellHistory.filter(item => item.state === 'Đang bán').length}</p>
          </div>
          <div className="stat-card">
            <h3>Chờ duyệt</h3>
            <p>{sellHistory.filter(item => item.state === 'Chờ duyệt').length}</p>
          </div>
        </div>
      </div>
      <SellHistorylist sellHistory={sellHistory} handleRPost={handleRPost} handleCancelPost={handleCancelPost} />
      
    </div>
  );
};

export default SellHistory; 
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom'; // Import useParams
import '../styles/Profile.css';
import axios from 'axios';

const Profile = () => {
  const { user,updateProfile, changePassword } = useAuth();
  const { userID } = useParams(); // Lấy userID từ URL
  const [message, setMessage] = useState({ type: '', text: '' });
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:8080/api/seller/${userID}`);

          setProfileData({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
          });
        } catch (error) {
          console.error('Không lấy được thông tin người dùng khác:', error);
        }
      } else {
        // Nếu không có userID, lấy thông tin người dùng hiện tại từ context
        setProfileData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
        });
      }
    };

    fetchData();
  }, [userID, user]); // Chạy lại khi userID hoặc user thay đổi

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await updateProfile(profileData);
      if (result.success) {
        setSuccessMessage('Đổi thông tin thành công');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Đổi thông tin thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi đổi thông tin:', error);
      setErrorMessage('Có lỗi xảy ra khi đổi thông tin');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
  
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Mật khẩu mới không khớp');
      return;
    }
  
    try {
      const response = await changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
  
      // Tùy vào phản hồi từ API (backend), xử lý thông điệp
      if (response.success) {
        setSuccessMessage(response.message || 'Đổi mật khẩu thành công');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage(response.message || 'Đổi mật khẩu thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      const errorMessage =
        error?.response?.data?.message || 'Có lỗi xảy ra khi kết nối đến máy chủ';
      setErrorMessage(errorMessage);
    }
  };

  if (!user) {
    return <div className="profile-container">Vui lòng đăng nhập để xem thông tin tài khoản.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Thông Tin Cá Nhân</h1>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>

      <div className="profile-content">
        <div className="profile-sidebar">
          <ul className="profile-menu">
            <li>
              <a 
                href="#profile" 
                className={activeTab === 'profile' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('profile');
                }}
              >
                <i className="fas fa-user"></i> Thông tin cá nhân
              </a>
            </li>
            {!userID && (
                <li>
                  <a
                      href="#password"
                      className={activeTab === 'password' ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab('password');
                      }}
                  >
                    <i className="fas fa-lock"></i> Đổi mật khẩu
                  </a>
                </li>
            )}
          </ul>
        </div>

        <div className="profile-form">
          {activeTab === 'profile' ? (
            <div>
              <div className="form-group-profile">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  disabled
                  required
                  placeholder="Nhập Email"
                />
              </div>
              <div className="form-group-profile">
                <label htmlFor="name">Họ và tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  required
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div className="form-group-profile">
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div className="form-actions">
                {!userID && !isEditing ? (
                    <button
                        type="button"
                        className="edit-button"
                        onClick={() => setIsEditing(true)}
                    >
                      <i className="fas fa-edit"></i> Chỉnh sửa
                    </button>
                ) : null}

                {isEditing && !userID && (
                    <>
                      <button type="submit" className="save-button" onClick={handleProfileSubmit}>
                        <i className="fas fa-save"></i> Lưu thay đổi
                      </button>
                      <button
                          type="button"
                          className="cancel-button"
                          onClick={() => {
                            setIsEditing(false);
                            setProfileData({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
                          }}
                      >
                        <i className="fas fa-times"></i> Hủy
                      </button>
                    </>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group-profile">
                <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>

              <div className="form-group-profile">
                <label htmlFor="newPassword">Mật khẩu mới</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Nhập mật khẩu mới"
                />
              </div>

              <div className="form-group-profile">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              <div className="form-actions">
                {!userID && (
                    <button type="submit" className="save-button">
                      <i className="fas fa-save"></i> Đổi mật khẩu
                    </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 
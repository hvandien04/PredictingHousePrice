import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useAuth();
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
      const response = await fetch(`http://127.0.0.1:5000/profile/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
      });

      if (response.ok) {
        setSuccessMessage('Cập nhật thông tin thành công');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Cập nhật thông tin thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật profile:', error);
      setErrorMessage('Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorMessage('Mật khẩu mới không khớp');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/profile/${user.id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      if (response.ok) {
        setSuccessMessage('Đổi mật khẩu thành công');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('Đổi mật khẩu thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi đổi mật khẩu:', error);
      setErrorMessage('Có lỗi xảy ra khi đổi mật khẩu');
    }
  };

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
          </ul>
        </div>

        <div className="profile-form">
          {activeTab === 'profile' ? (
            <form onSubmit={handleProfileSubmit}>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                  required
                  placeholder="Nhập email"
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
                {!isEditing ? (
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => setIsEditing(true)}
                  >
                    <i className="fas fa-edit"></i> Chỉnh sửa
                  </button>
                ) : (
                  <>
                    <button type="submit" className="save-button">
                      <i className="fas fa-save"></i> Lưu thay đổi
                    </button>
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData(profileData);
                      }}
                    >
                      <i className="fas fa-times"></i> Hủy
                    </button>
                  </>
                )}
              </div>
            </form>
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
                <button type="submit" className="save-button">
                  <i className="fas fa-save"></i> Đổi mật khẩu
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 
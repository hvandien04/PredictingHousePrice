import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../utils/authAPI';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isLoggedIn = await authService.checkSession();
      if (isLoggedIn) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error.response?.data || error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error.response?.data || error.message);
    }
  };

  const feedback = async (feedbackData) => {
    try {
      const response = await authService.feedback(feedbackData);
      return response;
    } catch (error) {
      return { success: false, error: error.response?.data || 'Có lỗi xảy ra khi gửi phản hồi.' };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authService.updateProfile(userData);
  
      // Nếu dùng axios thì response.data mới là phần nội dung body
      if (response === 'Profile updated successfully') {
        setUser(userData);
        return { success: true };
      }
      return { success: false, error: response.data };
    } catch (error) {
      console.error('Update profile error:', error.response || error);
      return {
        success: false,
        error: error.response?.data || 'Có lỗi xảy ra khi cập nhật thông tin!',
      };
    }
  };

  const changePassword = async (passwordData) => {
    return await authService.changePassword(passwordData)
  };

  const sendResetCode = async (email) => {
    try {
      const response = await authService.sendResetCode(email);
      return response;
    } catch (error) {
      return { success: false, error: error.response?.data || 'Có lỗi xảy ra khi gửi mã xác nhận.' };
    }
  };

  const resetPassword = async (email, newPassword, resetCode) => {
    try {
      const response = await authService.resetPassword(email, newPassword, resetCode);
      return response;
    } catch (error) {
      return { success: false, error: error.response?.data || 'Có lỗi xảy ra khi đặt lại mật khẩu.' };
    }
  };
  const verifyResetCode = async (email, resetCode) => {
    try {
      const response = await authService.verifyResetCode(email, resetCode);
      return response;
    } catch (error) {
      return { success: false, error: error.response?.data || 'Có lỗi xảy ra khi xác thực mã xác nhận.' };
    }
  };


//  if (isLoading) {
//    return <div>Loading...</div>;
//  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, changePassword, sendResetCode, resetPassword, verifyResetCode, message, feedback }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
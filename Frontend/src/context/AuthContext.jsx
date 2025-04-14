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

  const updateProfile = async (userData) => {
    try {
      console.log('Sending profile update request:', userData);
      const response = await authService.updateProfile(userData);
      console.log('Profile update response:', response);
      
      if (response === 'Profile updated successfully!') {
        setUser(userData);
        return { success: true };
      }
      return { success: false, error: response };
    } catch (error) {
      console.error('Update profile error:', error.response || error);
      return { success: false, error: error.response?.data || 'Có lỗi xảy ra khi cập nhật thông tin!' };
    }
  };

  const changePassword = async (passwordData) => {
    return await authService.changePassword(passwordData)
  };

//  if (isLoading) {
//    return <div>Loading...</div>;
//  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, changePassword, message }}>
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
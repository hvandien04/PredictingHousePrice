import React, { createContext, useState, useContext, useEffect } from 'react';
import { houseService } from '../utils/predictHouseAPI';
import { authService } from '../utils/authAPI';

const HPredictedContext = createContext(null);

export const HPredictedProvider = ({ children }) => {
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

  const predictHouse = async (data) => {
    const response = await houseService.predict(data);
    return response;
  };
  const historyPredict = async () => {
    const response = await houseService.history();
    console.log(response);
    return response;
  };
  const historySell = async () => {
    const response = await houseService.historySell();
    return response;
  };
  const updateState = async (id,state) => {
    try {
      const response = await houseService.updateState(id,state);
      return response;
    } catch (error) {
      console.error('Error canceling post:', error.response?.data || error.message);
      throw error;
    }
  };
//  if (isLoading) {
//    return <div>Loading...</div>;
//  }

  return (
    <HPredictedContext.Provider value={{ predictHouse, historyPredict, historySell, updateState, message }}>
      {children}
    </HPredictedContext.Provider>
  );
};

export const useHPredicted = () => {
  const context = useContext(HPredictedContext);
  if (!context) {
    throw new Error('useHPredicted must be used within an AuthProvider');
  }
  return context;
}; 
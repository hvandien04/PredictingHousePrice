import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../utils/authAPI';
import '../styles/Login.css';
import { use } from 'react';


const Login = () => {
  const navigate = useNavigate();
  const { login,user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await authService.login(formData.email, formData.password);
      if (success) {
        const userData = await authService.getCurrentUser();
        console.log('User data:', userData);
        login(userData);
        if (userData.role === '1') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError('Email hoặc mật khẩu không chính xác');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng nhập</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=""
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=""
              required
            />
            <label htmlFor="password">Mật khẩu</label>
          </div>
          <button type="submit" className="btn-login" disabled={isLoading}>
            Đăng nhập
          </button>
        </form>
        <div className="login-footer">
          <Link to="/forgot-password" className="forgot-password">
            Quên mật khẩu?
          </Link>
          <p className="register-link">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 
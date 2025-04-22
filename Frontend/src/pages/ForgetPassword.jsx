import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../utils/authAPI';
import '../styles/Login.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.message || 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.');
    } catch (err) {
      console.error('Forget password error:', err.response?.data || err.message);
      setError(err.response?.data || 'Không thể gửi yêu cầu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Quên mật khẩu</h1>
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              required
            />
            <label htmlFor="email">Nhập email của bạn</label>
          </div>
          <button type="submit" className="btn-login" disabled={isLoading}>
            Gửi yêu cầu
          </button>
        </form>
        <div className="login-footer">
          <Link to="/login" className="forgot-password">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

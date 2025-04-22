import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // bước hiện tại

  const { sendResetCode, verifyResetCode, resetPassword } = useAuth();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await sendResetCode(email);
      setMessage(response.message || 'Mã xác nhận đã được gửi vào email.');
      setStep(2); // chuyển sang bước nhập mã
    } catch (err) {
      setError(err.error || 'Gửi mã thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await verifyResetCode(email, resetCode);
      if (response.status === "success") {
        setMessage('Mã xác nhận đúng, tiếp tục đặt lại mật khẩu.');
        setStep(3); // chuyển sang bước nhập mật khẩu mới
      } else {
        setError('Mã xác nhận không hợp lệ.');
      }
    } catch (err) {
      setError(err.error || 'Xác minh mã thất bại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const response = await resetPassword(email, newPassword, resetCode);
      if (response.status === "success") {
        setMessage('Đặt lại mật khẩu thành công!');
        setStep(1); // quay lại bước đầu
        setEmail('');
        setResetCode('');
        setNewPassword('');
      } else {
        setError(response.error || 'Đặt lại mật khẩu thất bại.');
      }
    } catch (err) {
      setError(err.error || 'Lỗi khi đặt lại mật khẩu.');
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

        {/* Bước 1: Nhập email */}
        {step === 1 && (
          <div>
            <div className="form-group">
              <input
                type="email"
                id="email"
                placeholder=''
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">Nhập email của bạn</label>
            </div>
            <button onClick={handleSendCode} className="btn-login" disabled={isLoading}>
              Gửi mã xác nhận
            </button>
          </div>
        )}

        {/* Bước 2: Nhập mã xác nhận */}
        {step === 2 && (
          <div>
            <div className="form-group">
              <input
                type="text"
                id="code"
                placeholder=''
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                required
              />
              <label htmlFor="code">Nhập mã xác nhận</label>
            </div>
            <button onClick={handleVerifyCode} className="btn-login" disabled={isLoading}>
              Xác minh mã
            </button>
          </div>
        )}

        {/* Bước 3: Đặt lại mật khẩu */}
        {step === 3 && (
          <div>
            <div className="form-group">
              <input
                type="password"
                id="newPassword"
                placeholder=''
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <label htmlFor="newPassword">Nhập mật khẩu mới</label>
            </div>
            <button onClick={handleResetPassword} className="btn-login" disabled={isLoading}>
              Đặt lại mật khẩu
            </button>
          </div>
        )}

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

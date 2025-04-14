import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../utils/authAPI';
import { toast } from 'react-toastify';
import '../styles/Login.css';

const Register = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(''); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    
    if (password.length < minLength) {
      return 'Mật khẩu phải có ít nhất 8 ký tự';
    }
    if (!hasLetter || !hasNumber) {
      return 'Mật khẩu phải chứa cả chữ và số';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate password when it changes
    if (name === 'password') {
      setErrors(prev => ({
        ...prev,
        password: validatePassword(value)
      }));
    }

    // Validate confirm password when it changes
    if (name === 'confirmPassword') {
      setErrors(prev => ({
        ...prev,
        confirmPassword: value !== formData.password ? 'Mật khẩu xác nhận không khớp' : ''
      }));
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };
  
      const res = await authService.register(registerData);
  
      toast.success('Đăng ký thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      navigate('/login');
  
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data);
      } else {
        setError('Đã có lỗi xảy ra khi đăng ký');
      }
    }
  };

  const shouldShowError = (fieldName) => {
    return (touched[fieldName] || isSubmitted) && errors[fieldName];
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng ký</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="name">Họ tên</label>
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="phone">Số điện thoại</label>
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder=" "
              required
            />
            <label htmlFor="password">Mật khẩu</label>
            {shouldShowError('password') && <span className="error-message">{errors.password}</span>}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder=" "
              required
            />
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            {shouldShowError('confirmPassword') && <span className="error-message">{errors.confirmPassword}</span>}
            {error && <div className="error-message">{error}</div>}
          </div>
          <button type="submit" className="btn-login">
            Đăng ký
          </button>
        </form>
        <p className="register-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 
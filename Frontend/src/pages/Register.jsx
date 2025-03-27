import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Validate all fields
    const newErrors = {};
    
    // Validate password
    newErrors.password = validatePassword(formData.password);
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);

    // If there are no errors, proceed with registration
    if (!newErrors.password && !newErrors.confirmPassword) {
      // TODO: Xử lý đăng ký
      console.log('Register data:', formData);
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
import React, { useState } from 'react';
import '../styles/SellHouse.css';

const SellHouse = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    type: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
  });

  const [filters, setFilters] = useState({
    priceRange: '',
    location: '',
    type: '',
    bedrooms: '',
  });

  // Mock data cho danh sách nhà
  const [houses] = useState([
    {
      id: 1,
      title: 'Nhà phố cao cấp Quận 7',
      price: '5.2 tỷ',
      location: 'Quận 7',
      type: 'Nhà phố',
      area: '120m²',
      bedrooms: 4,
      bathrooms: 3,
      description: 'Nhà phố cao cấp, full nội thất, vị trí đẹp...',
      image: 'https://file4.batdongsan.com.vn/crop/393x222/2024/02/27/20240227160332-a465_wm.jpg'
    },
    {
      id: 2,
      title: 'Căn hộ view sông Quận 2',
      price: '3.8 tỷ',
      location: 'Quận 2',
      type: 'Chung cư',
      area: '85m²',
      bedrooms: 3,
      bathrooms: 2,
      description: 'Căn hộ view sông thoáng mát...',
      image: 'https://file4.batdongsan.com.vn/crop/393x222/2024/02/27/20240227160440-3724_wm.jpg'
    },
    // Thêm mock data nếu cần
  ]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form
    console.log(formData);
    setShowForm(false);
  };

  return (
    <div className="sell-house-container">
      {/* Sidebar filters */}
      <aside className="sell-house-filters">
        <div className="filters-header">
          <h2>Bộ lọc tìm kiếm</h2>
        </div>
        
        <div className="filter-group">
          <label>Khoảng giá</label>
          <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
            <option value="">Tất cả mức giá</option>
            <option value="0-2">Dưới 2 tỷ</option>
            <option value="2-5">2 - 5 tỷ</option>
            <option value="5-10">5 - 10 tỷ</option>
            <option value="10+">Trên 10 tỷ</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Khu vực</label>
          <select name="location" value={filters.location} onChange={handleFilterChange}>
            <option value="">Tất cả khu vực</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận 2">Quận 2</option>
            <option value="Quận 7">Quận 7</option>
            <option value="Quận 9">Quận 9</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Loại nhà</label>
          <select name="type" value={filters.type} onChange={handleFilterChange}>
            <option value="">Tất cả loại nhà</option>
            <option value="Nhà phố">Nhà phố</option>
            <option value="Biệt thự">Biệt thự</option>
            <option value="Chung cư">Chung cư</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Số phòng ngủ</label>
          <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
            <option value="">Tất cả</option>
            <option value="1">1 phòng</option>
            <option value="2">2 phòng</option>
            <option value="3">3 phòng</option>
            <option value="4+">4+ phòng</option>
          </select>
        </div>
      </aside>

      {/* Main content */}
      <main className="sell-house-main">
        <div className="sell-house-header">
          <h1>Nhà đang bán</h1>
          <button className="add-sell-btn" onClick={() => setShowForm(true)}>
            + Đăng tin mới
          </button>
        </div>

        <div className="houses-grid">
          {houses.map((house) => (
            <div key={house.id} className="house-card">
              <div className="house-image">
                <img src={house.image} alt={house.title} />
              </div>
              <div className="house-content">
                <h3>{house.title}</h3>
                <p className="house-price">{house.price}</p>
                <div className="house-details">
                  <span>{house.location}</span>
                  <span>{house.area}</span>
                  <span>{house.bedrooms} PN</span>
                  <span>{house.bathrooms} WC</span>
                </div>
                <p className="house-description">{house.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="sell-form-modal">
            <h2>Đăng Tin Bán Nhà</h2>
            <form onSubmit={handleSubmit}>
              <div className="sell-form-grid">
                <div className="sell-form-group">
                  <label>Tiêu đề</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="sell-form-group">
                  <label>Giá bán</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="sell-form-group">
                  <label>Khu vực</label>
                  <select name="location" value={formData.location} onChange={handleFormChange} required>
                    <option value="">Chọn khu vực</option>
                    <option value="Quận 1">Quận 1</option>
                    <option value="Quận 2">Quận 2</option>
                    <option value="Quận 7">Quận 7</option>
                    <option value="Quận 9">Quận 9</option>
                  </select>
                </div>

                <div className="sell-form-group">
                  <label>Loại nhà</label>
                  <select name="type" value={formData.type} onChange={handleFormChange} required>
                    <option value="">Chọn loại nhà</option>
                    <option value="Nhà phố">Nhà phố</option>
                    <option value="Biệt thự">Biệt thự</option>
                    <option value="Chung cư">Chung cư</option>
                  </select>
                </div>

                <div className="sell-form-group">
                  <label>Diện tích</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleFormChange}
                    placeholder="m²"
                    required
                  />
                </div>

                <div className="sell-form-group">
                  <label>Số phòng ngủ</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleFormChange}
                    min="0"
                    required
                  />
                </div>

                <div className="sell-form-group">
                  <label>Số phòng tắm</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleFormChange}
                    min="0"
                    required
                  />
                </div>

                <div className="sell-form-group sell-full-width">
                  <label>Mô tả</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="sell-form-group sell-full-width">
                  <label>Hình ảnh</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      // Handle image upload
                    }}
                  />
                </div>
              </div>

              <div className="sell-form-actions">
                <button type="button" className="sell-btn-cancel" onClick={() => setShowForm(false)}>
                  Hủy
                </button>
                <button type="submit" className="sell-btn-submit">
                  Đăng tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellHouse; 
import React, { useState, useEffect } from 'react';
import '../styles/SellHouse.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const SellHouse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [houseType, setHouseTypes] = useState([]);
  const [address, setAddress] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]); // Dữ liệu sau khi lọc
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    address: '',
    houseType: '',
    area: '',
    bedrooms: '',
    bathrooms: '',
    floors: '',
    legalStatus: '',
    state: 'Chờ duyệt',
    description: '',
    image: '',
    userID: ''
  });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/house-types")
        .then(res => res.json())
        .then(data => setHouseTypes(data))
        .catch(err => console.error("Lỗi lấy loại nhà:", err));

    fetch("http://127.0.0.1:5000/districts")
        .then(res => res.json())
        .then(data => setAddress(data))
        .catch(err => console.error("Lỗi lấy quận/huyện:", err));
  }, []);

  const [filters, setFilters] = useState({
    priceRange: '',
    address: '',
    houseType: '',
    bedrooms: '',
  });

  // State to store house listings fetched from API
  const [houses, setHouses] = useState([]);

  // Fetch house listings from API
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/sellinghouses');
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu từ API');
        }
        const data = await response.json();

        console.log(data);

        setHouses(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nhà:', error);
      }
    };

    fetchHouses();
  }, []);

  // Hàm xử lý thay đổi bộ lọc
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Hàm lọc nhà theo các bộ lọc
  useEffect(() => {
    let filtered = houses;

    if (filters.priceRange) {
      if (filters.priceRange === '10+') {
        filtered = filtered.filter((house) => house.price >= 10);
      } else {
        const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
        filtered = filtered.filter((house) => {
          return house.price >= minPrice && house.price <= maxPrice;
        });
      }
    }


    // Lọc theo khu vực
    if (filters.address) {
      filtered = filtered.filter((house) => house.address === filters.address);
    }

    // Lọc theo loại nhà
    if (filters.houseType) {
      filtered = filtered.filter((house) => house.houseType === filters.houseType);
    }

    if (filters.bedrooms) {
      if (filters.bedrooms === '4+') {
        filtered = filtered.filter((house) => house.bedrooms >= 4);
      } else {
        filtered = filtered.filter((house) => house.bedrooms === parseInt(filters.bedrooms));
      }
    }

    // Cập nhật kết quả lọc
    setFilteredHouses(filtered);
  }, [filters, houses]); // Chạy lại khi filters hoặc houses thay đổi

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu các trường dữ liệu bắt buộc chưa được nhập đầy đủ
    if (!formData.title || !formData.price || !formData.area || !formData.image) {
      alert('Vui lòng điền đầy đủ thông tin và tải ảnh lên!');
      return;
    }

    // Kiểm tra nếu người dùng chưa đăng nhập
    if (!user) {
      console.log('User chưa đăng nhập:', user);
      toast.warning('Vui lòng đăng nhập để tiếp tục', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/login");
      return;
    }

    // Chuẩn bị payload gửi lên server
    const formPayload = {
      ...formData,
      price: parseFloat(formData.price.replace(' tỷ', '').replace(',', '')),
      area: parseFloat(formData.area.replace('m²', '').replace(',', '')),
    };

    try {
      // Bước 1: Tải ảnh lên server và nhận URL ảnh
      const imageData = await uploadImage(formData.image);
      formPayload.image = imageData; // Gán URL ảnh vào dữ liệu formPayload

      // Bước 2: Gửi dữ liệu bài đăng lên server
      const response = await fetch('http://localhost:8080/api/uploadhouse/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formPayload),
      });

      if (!response.ok) {
        throw new Error(`Server trả về lỗi với mã trạng thái: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dữ liệu đã được lưu:', data);

      window.location.reload();

      // Reset form sau khi gửi thành công
      setFormData({
        title: '',
        price: '',
        address: '',
        houseType: '',
        area: '',
        bedrooms: '',
        bathrooms: '',
        floors: '',
        legalStatus: '',
        state: 'Chờ duyệt',
        description: '',
        image: '',
        userID: '',
      });

    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.');
    }
  };

 // Hàm tải ảnh lên server
  const uploadImage = async (image) => {
    const fileData = new FormData();
    fileData.append('file', image); // Giả sử formData.image là file ảnh

    const response = await fetch('http://localhost:8080/api/uploadimage/image', {
      method: 'POST',
      body: fileData,
    });

    if (!response.ok) {
      throw new Error('Lỗi khi tải ảnh lên');
    }

    const data = await response.text(); // Server trả về URL ảnh
    console.log('Ảnh đã được tải lên:', data);
    return data; // Trả về URL ảnh
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
              <option value="">Tất cả</option>
              <option value="0-2">Dưới 2 tỷ</option>
              <option value="2-5">2 - 5 tỷ</option>
              <option value="5-10">5 - 10 tỷ</option>
              <option value="10+">Trên 10 tỷ</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Khu vực</label>
            <select id="filter-address" name="address" value={filters.address} onChange={handleFilterChange}>
              <option value="">Tất cả khu vực</option>
              {address.map((address) => (
                  <option key={address.id} value={address.value}>{address.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Loại nhà</label>
            <select id="filter-houseType" name="houseType" value={filters.houseType} onChange={handleFilterChange}>
              <option value="">Tất cả loại nhà</option>
              {houseType.map((type) => (
                  <option key={type.id} value={type.value}>{type.label}</option>
              ))}
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
            {filteredHouses.map((house) => (
                <div key={house.pHouseID} className="sell-house-card">
                  <div className="sell-house-image">
                    <img src={house.image} alt={house.title} />
                  </div>
                  <div className="sell-house-content">
                    <h3>{house.title}</h3>
                    <p className="sell-house-price">{house.price} tỷ</p>
                    <div className="sell-house-details">
                      <span>{house.address}</span>
                      <span>{house.area} m²</span>
                      <span>{house.bedrooms} PN</span>
                      <span>{house.bathrooms} WC</span>
                      <span>{house.legalStatus}</span>
                      <span>{house.floors} tầng</span>
                    </div>
                    <p className="sell-house-description">{house.description}</p>
                    <div className="sell-house-description">
                      <Link to={`/profile/${house.userID}`} className="sell-house-profile-link">
                        Liên hệ
                      </Link>
                    </div>
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
                      <select
                          id="form-address"
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          required
                      >
                        <option value="">Chọn khu vực</option>
                        {address.map((address) => (
                            <option key={address.id} value={address.value}>{address.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sell-form-group">
                      <label>Loại nhà</label>
                      <select
                          id="form-houseType"
                          name="houseType"
                          value={formData.houseType}
                          onChange={handleFormChange}
                          required
                      >
                        <option value="">Chọn loại nhà</option>
                        {houseType.map((type) => (
                            <option key={type.id} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="sell-form-group">
                      <label>Diện tích</label>
                      <input
                          type="number"
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
                    <div className="sell-form-group">
                      <label>Số tầng</label>
                      <input
                          type="number"
                          name="floors"
                          value={formData.floors}
                          onChange={handleFormChange}
                          min="1"
                          required
                      />
                    </div>

                    <div className="sell-form-group">
                      <label>Tình trạng pháp lý</label>
                      <select
                          name="legalStatus"
                          value={formData.legalStatus}
                          onChange={handleFormChange}
                          required
                      >
                        <option value="">Chọn tình trạng</option>
                        <option value="Chính chủ">Chính chủ</option>
                        <option value="Sổ đỏ">Sổ đỏ</option>
                        <option value="Hợp đồng mua bán">Hợp đồng mua bán</option>
                      </select>
                    </div>

                    <div className="sell-form-group">
                      <label>Mô tả</label>
                      <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleFormChange}
                          required
                          style={{ margin: '0' }}
                      />
                    </div>

                    <div className="sell-form-group">
                      <label>Ảnh</label>
                      <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                      />
                      <div className="preview-images">
                        {formData.image && (
                            <img
                                src={URL.createObjectURL(formData.image)} // Hiển thị ảnh
                                alt="Preview"
                                className="preview-image"
                            />
                        )}
                      </div>
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

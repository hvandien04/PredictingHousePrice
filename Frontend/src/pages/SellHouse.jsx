import React, { useState, useEffect } from 'react';
import '../styles/SellHouse.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const SellHouse = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
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
    state: '',
    description: '',
    image: ''
  });

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
        const response = await fetch('http://localhost:8080/api/sellinghouses');  // Thay URL API của bạn ở đây
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu từ API');
        }
        const data = await response.json();

        console.log(data);  // In dữ liệu ở đây

        setHouses(data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nhà:', error);
        alert('Không thể lấy dữ liệu nhà');
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

    // Lọc theo khoảng giá
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter((house) => {
        return house.price >= minPrice && house.price <= maxPrice;
      });
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

    if (!formData.title || !formData.price || !formData.area) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (!user) {
      console.log('User chưa đăng nhập:', user);  // Kiểm tra giá trị của user
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

    const formPayload = {
      ...formData,
      price: parseFloat(formData.price.replace(' tỷ', '').replace(',', '')),
      area: parseFloat(formData.area.replace('m²', '').replace(',', '')),
    };

    console.log('Dữ liệu chuẩn bị gửi:', formPayload);

    try {
      const response = await fetch(`http://localhost:8080/api/uploadhouse/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures the session cookie is sent
        body: JSON.stringify(formPayload),
      });

      if (!response.ok) {
        throw new Error(`Server trả về lỗi với mã trạng thái: ${response.status}`);
      }

      const data = await response.json();
      console.log('Dữ liệu đã được lưu:', data);

      alert('Đã thêm nhà thành công!');

      // Reset form after successful submission
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
        state: '',
        description: '',
        image: ''
      });

    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu:', error);
      alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.');
    }
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imagePreview = document.getElementById('imagePreview');
    if (imagePreview) {
      // Hiển thị trước ảnh khi người dùng chọn file
      const reader = new FileReader();
      reader.onloadend = () => {
        imagePreview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:8080/api/uploadimage/image', {
      method: 'POST',
      body: formData,
    })
        .then((response) => response.text()) // server trả về plain text, không phải JSON
        .then((data) => {
          console.log('Ảnh đã được tải lên:', data);
          alert('Tải ảnh lên thành công!');

          // Gán lại ảnh bằng đường dẫn chính thức từ server
          if (imagePreview) {
            imagePreview.src = data;
          }

          // Cập nhật lại formData với URL ảnh
          setFormData(prevData => ({
            ...prevData,
            image: data // Lưu URL ảnh trả về từ server
          }));
        })
        .catch((error) => {
          console.error('Lỗi khi tải ảnh lên:', error);
          alert('Có lỗi xảy ra khi tải ảnh lên. Vui lòng thử lại.');
        });
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
              <option value="10-1000">Trên 10 tỷ</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Khu vực</label>
            <select name="address" value={filters.address} onChange={handleFilterChange}>
              <option value="">Tất cả khu vực</option>
              <option value="Quận 1">Quận 1</option>
              <option value="Quận 2">Quận 2</option>
              <option value="Quận 7">Quận 7</option>
              <option value="Quận 9">Quận 9</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Loại nhà</label>
            <select name="houseType" value={filters.houseType} onChange={handleFilterChange}>
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
                      <span>{house.area} m2</span>
                      <span>{house.bedrooms} PN</span>
                      <span>{house.bathrooms} WC</span>
                      <span>{house.legalStatus}</span>
                    </div>
                    <p className="sell-house-description">{house.description}</p>
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
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          required
                      >
                        <option value="">Chọn khu vực</option>
                        <option value="Quận 1">Quận 1</option>
                        <option value="Quận 2">Quận 2</option>
                        <option value="Quận 7">Quận 7</option>
                        <option value="Quận 9">Quận 9</option>
                      </select>
                    </div>

                    <div className="sell-form-group">
                      <label>Loại nhà</label>
                      <select
                          name="houseType"
                          value={formData.houseType}
                          onChange={handleFormChange}
                          required
                      >
                        <option value="">Chọn loại nhà</option>
                        <option value="Nhà phố">Nhà phố</option>
                        <option value="Biệt thự">Biệt thự</option>
                        <option value="Chung cư">Chung cư</option>
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
                      <label>Trạng thái</label>
                      <select
                          name="state"
                          value={formData.state}
                          onChange={handleFormChange}
                          required
                      >
                        <option value="">Chọn trạng thái</option>
                        <option value="Đang bán">Đang bán</option>
                        <option value="Đã bán">Đã bán</option>
                        <option value="Đang đặt cọc">Đang đặt cọc</option>
                      </select>
                    </div>


                    <div className="sell-form-group">
                      <label>Mô tả</label>
                      <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleFormChange}
                          required
                      />
                    </div>

                    <div className="sell-form-group">
                      <label>Ảnh</label>
                      <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                      />
                      <div className="preview-images">
                        {formData.image && (
                            <img
                                src={formData.image}
                                alt="Preview"
                                className="preview-image"
                            />
                        )}
                      </div>
                    </div>

                  </div>

                  <div className="form-buttons">
                    <button type="submit">Đăng tin</button>
                    <button type="button" onClick={() => setShowForm(false)}>Hủy</button>
                  </div>
                </form>
              </div>
            </div>
        )}
      </div>
  );
};

export default SellHouse;

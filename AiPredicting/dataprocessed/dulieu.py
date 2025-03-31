import pandas as pd
import numpy as np

# Giá trung bình theo quận (triệu/m2)
gia_trung_binh = {
    "Quận 1": 406, "Quận 2 (TP. Thủ Đức)": 125, "Quận 3": 257, "Quận 4": 55.2, "Quận 5": 258,
    "Quận 6": 102, "Quận 7": 89.6, "Quận 8": 83.7, "Quận 9 (TP. Thủ Đức)": 56.2, "Quận 10": 228,
    "Quận 11": 142, "Quận 12": 56.7, "Quận Bình Tân": 78.9, "Quận Bình Thạnh": 138, "Quận Gò Vấp": 102,
    "Quận Phú Nhuận": 175, "Quận Tân Bình": 144, "Quận Tân Phú": 98.8, "Quận Thủ Đức (TP. Thủ Đức)": 71.1,
    "Huyện Bình Chánh": 20.2, "Huyện Cần Giờ": 18.2, "Huyện Củ Chi": 8.7, "Huyện Hóc Môn": 26.9, "Huyện Nhà Bè": 59.8
}

# Loại nhà với hệ số giá
loai_nha = {
    "Nhà hẻm": 1.3,
    "Nhà mặt tiền": 2.6,
    "Biệt thự": 5.2,
    "Chung cư": 1
}

# Tạo dữ liệu ngẫu nhiên
so_luong_mau = 10000
dien_tich = np.random.randint(10, 541, so_luong_mau)  
so_phong = np.random.randint(1, 10, so_luong_mau) 
so_tang = np.random.randint(1, 7, so_luong_mau)  
vi_tri = np.random.choice(list(gia_trung_binh.keys()), so_luong_mau)
loai_nha_chon = np.random.choice(list(loai_nha.keys()), so_luong_mau)

# Giá cơ bản theo vị trí
gia = np.vectorize(gia_trung_binh.get)(vi_tri) * dien_tich

# Điều chỉnh giá theo loại nhà
gia = gia * np.vectorize(loai_nha.get)(loai_nha_chon)

# Điều chỉnh giá theo số phòng ngủ
gia = gia * (1 + np.random.uniform(0.2, 0.3, so_luong_mau) * (np.log2(so_phong / 1)))

# Điều chỉnh giá theo số tầng
gia *= 1 + np.random.uniform(0.4, 0.5, so_luong_mau) * (np.log2(so_tang / 1))

# Tạo DataFrame
df = pd.DataFrame({
    "Loại nhà": loai_nha_chon,
    "Vị trí": vi_tri,
    "Diện tích": dien_tich,
    "Số phòng ngủ": so_phong,
    "Số tầng": so_tang,
    "Giá": (gia / 1e3 / 9).round(2)  # Làm tròn giá trị về tỷ VND
})

# Lưu file CSV
ten_file = "testdata1.csv"
df.to_csv(ten_file, index=False, encoding="utf-8-sig")

print(f"File dữ liệu đã được lưu tại: {ten_file}")

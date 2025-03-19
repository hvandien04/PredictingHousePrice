import pandas as pd
import numpy as np

# Danh sách quận theo khu vực
quan_trung_tam = ["Quận 1", "Quận 3", "Quận 5", "Quận 10", "Quận 11", "Phú Nhuận", "Bình Thạnh"]
quan_can_trung_tam = ["Quận 2", "Quận 4", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 12", "Tân Bình", "Tân Phú", "Gò Vấp", "Thủ Đức", "Bình Tân"]
quan_vung_ria = ["Nhà Bè", "Hóc Môn", "Củ Chi", "Cần Giờ", "Bình Chánh"]

# Loại nhà với hệ số giá
loai_nha = {
    "Nhà hẻm": 0.9,
    "Nhà mặt tiền": 1.0,
    "Biệt thự": 1.1,
    "Chung cư": 0.95
}

# Tạo dữ liệu ngẫu nhiên
so_luong_mau = 10000

dien_tich = np.random.randint(50, 251, so_luong_mau)  # 50 - 250 m2
so_phong = np.random.randint(2, 9, so_luong_mau)  # 2 - 8 phòng ngủ
so_tang = np.random.randint(1, 5, so_luong_mau)  # 1 - 4 tầng

vi_tri = np.random.choice(quan_trung_tam + quan_can_trung_tam + quan_vung_ria, so_luong_mau)
loai_nha_chon = np.random.choice(list(loai_nha.keys()), so_luong_mau)

# Giá cơ bản (triệu/m2)
gia_co_ban = 6 * 1e6  # 6 triệu/m2
gia = gia_co_ban * dien_tich

# Điều chỉnh giá theo khu vực
gia *= np.where(np.isin(vi_tri, quan_trung_tam), 1.7, 1)  # Trung tâm cao hơn vùng rìa 30%
gia *= np.where(np.isin(vi_tri, quan_can_trung_tam), 1.3, 1)  # Cận trung tâm cao hơn vùng rìa 20%

# Điều chỉnh giá theo loại nhà
gia *= np.vectorize(loai_nha.get)(loai_nha_chon)

# Điều chỉnh giá theo diện tích
gia *= 1 + np.random.uniform(0.5, 0.6, so_luong_mau) * (np.log2(dien_tich / 50))

# Điều chỉnh giá theo số phòng ngủ
gia *= 1 + np.random.uniform(0.2, 0.3, so_luong_mau) * (np.log2(so_phong / 2))

# Điều chỉnh giá theo số tầng
gia *= 1 + np.random.uniform(0.4, 0.5, so_luong_mau) * (np.log2(so_tang / 1))

# Tạo DataFrame
df = pd.DataFrame({
    "Loại nhà": loai_nha_chon,
    "Vị trí": vi_tri,
    "Diện tích": dien_tich,
    "Số phòng ngủ": so_phong,
    "Số tầng": so_tang,
    "Giá": gia.astype(int)
})

# Lưu file CSV
ten_file = "gia_nha_tphcm.csv"
df.to_csv(ten_file, index=False, encoding="utf-8-sig")

print(f"File dữ liệu đã được lưu tại: {ten_file}")

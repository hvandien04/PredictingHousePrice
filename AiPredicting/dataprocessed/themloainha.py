import pandas as pd

# Đọc file CSV (cập nhật đường dẫn file CSV của bạn)
file_path = "train_data.csv"  # Thay bằng đường dẫn thực tế
df = pd.read_csv(file_path)

# Hàm phân loại nhà dựa trên diện tích
def classify_house(area):
    if area < 40:
        return "Chung cư"
    elif 40 <= area < 64:
        return "Nhà hẻm"
    elif 64 <= area < 100:
        return "Nhà mặt tiền"
    elif area >= 100:
        return "Biệt thự"

# Áp dụng hàm phân loại vào cột Area
df["Loại nhà"] = df["Area"].apply(classify_house)

# Lưu file mới với dữ liệu đã được phân loại
output_file = "train_data1.csv"
df.to_csv(output_file, index=False, encoding="utf-8-sig")

print(f"File đã được lưu thành {output_file}")

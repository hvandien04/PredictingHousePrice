from sklearn.model_selection import train_test_split
import pandas as pd

# Đọc dữ liệu
data = pd.read_csv("vietnam_housing_dataset.csv")
print(data.head())

# Kiểm tra dữ liệu
null_counts = data.isnull().sum()
print("Số lượng giá trị NaN trong từng cột:")
print(null_counts)

# Tính tổng số dòng
total_rows = len(data)
print(f"Tổng số dòng: {total_rows}")

# Tính tỷ lệ phần trăm dữ liệu thiếu
null_percentage = (null_counts / total_rows) * 100
null_percentage = null_percentage.round(2)

print("Tỷ lệ phần trăm dữ liệu thiếu (%):")
print(null_percentage)

# Xóa các dòng có giá trị NaN
data_cleaned = data.dropna()

# Kiểm tra lại dữ liệu sau khi loại bỏ các dòng null
null_counts_cleaned = data_cleaned.isnull().sum()
print("Số lượng giá trị NaN sau khi loại bỏ các dòng null:")
print(null_counts_cleaned)

# Chỉ lấy dữ liệu ở TP.HCM
data_hcm = data_cleaned[data_cleaned['Address'].str.contains('TP.HCM|Hồ Chí Minh', case=False, na=False)]

# Kiểm tra kết quả
print("Dữ liệu các căn nhà ở TP.HCM:")
print(data_hcm)

# Chia dữ liệu thành tập train và test
train_data, test_data = train_test_split(data_hcm, test_size=0.2, random_state=42)

# Xuất dữ liệu ra file CSV
train_data.to_csv("train_data.csv", index=False, encoding='utf-8-sig')
test_data.to_csv("test_data.csv", index=False, encoding='utf-8-sig')

# Thông báo thành công
print("Dữ liệu đã được xuất ra file 'train_data.csv' và 'test_data.csv'.")

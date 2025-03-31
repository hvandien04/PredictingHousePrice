import pandas as pd

# Đọc dữ liệu từ file CSV (thay 'input.csv' bằng đường dẫn file của bạn)
df = pd.read_csv("train_data1.csv")

# Thêm cột "Vị trí" bằng cách lấy thông tin ngay trước "Hồ Chí Minh"
df["Vị trí"] = df["Address"].apply(lambda x: x.split(",")[-2].strip() if "Hồ Chí Minh" in x else "")

# Xuất ra file CSV mới
df.to_csv("train_data2.csv", index=False, encoding="utf-8-sig")

print("Đã xuất file output.csv thành công!")

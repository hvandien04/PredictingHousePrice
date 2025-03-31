import pandas as pd
import joblib
import unicodedata

# Đọc mô hình và bộ mã hóa
model = joblib.load("house_price_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoder_loai = joblib.load("label_encoder_loai.pkl")
label_encoder_vi_tri = joblib.load("label_encoder_vi_tri.pkl")

# Chuẩn hóa tên
def chuan_hoa_ten(text):
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    return text.lower().replace(" ", "_")

# Đọc dữ liệu
file_path = "train_data2.csv"
df = pd.read_csv(file_path, encoding="utf-8")

# Mã hóa dữ liệu
for col in ["Loại nhà", "Vị trí"]:
    df[col] = df[col].apply(chuan_hoa_ten)
    df[col] = label_encoder_loai.transform(df[col]) if col == "Loại nhà" else label_encoder_vi_tri.transform(df[col])

# Chọn cột đầu vào
X = df[["Loại nhà", "Vị trí", "Diện tích", "Số phòng ngủ", "Số tầng"]]
X_scaled = scaler.transform(X)

# Dự đoán
df["Giá dự đoán"] = model.predict(X_scaled)

# Xuất dữ liệu
output_path = "predicted_prices1.csv"
df.to_csv(output_path, index=False, encoding="utf-8-sig")
print(f"Đã lưu kết quả vào {output_path}!")

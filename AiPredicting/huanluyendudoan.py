import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib
import unicodedata

# 1. Đọc dữ liệu
file_path = "finaldata.csv"
df = pd.read_csv(file_path, encoding="utf-8")

print("Dữ liệu đã được đọc thành công!")
print("Một số dòng dữ liệu đầu tiên:")
print(df.head())

# 2. Mã hóa cột "Loại nhà" và "Vị trí"
# Chuẩn hóa cột "Loại nhà" và "Vị trí" 
def chuan_hoa_ten(text):
    text = unicodedata.normalize('NFD', text)  # Tách dấu khỏi ký tự gốc
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')  # Loại bỏ dấu
    return text.lower().replace(" ", "_")  # Chuyển về chữ thường và thay khoảng trắng thành "_"

df["Loại nhà gốc"] = df["Loại nhà"]  # Lưu dữ liệu gốc
df["Vị trí gốc"] = df["Vị trí"]
label_encoder_loai_goc = LabelEncoder()
label_encoder_vi_tri_goc = LabelEncoder()

df["Loại nhà gốc"] = label_encoder_loai_goc.fit_transform(df["Loại nhà gốc"])
df["Vị trí gốc"] = label_encoder_vi_tri_goc.fit_transform(df["Vị trí gốc"])

df["Loại nhà"] = df["Loại nhà"].apply(chuan_hoa_ten)
df["Vị trí"] = df["Vị trí"].apply(chuan_hoa_ten)
label_encoder_loai = LabelEncoder()
label_encoder_vi_tri = LabelEncoder()

df["Loại nhà"] = label_encoder_loai.fit_transform(df["Loại nhà"])
df["Vị trí"] = label_encoder_vi_tri.fit_transform(df["Vị trí"])

print("\nHoàn tất mã hóa dữ liệu:")
print(df[["Loại nhà", "Vị trí"]].head())

# 3. Chia dữ liệu thành tập huấn luyện và kiểm tra
X = df[["Loại nhà", "Vị trí", "Diện tích", "Số phòng ngủ", "Số tầng"]]
y = df["Giá"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print("\nKích thước tập huấn luyện và kiểm tra:")
print(f"- Số mẫu tập huấn luyện: {X_train.shape[0]}")
print(f"- Số mẫu tập kiểm tra: {X_test.shape[0]}")

# 4. Chuẩn hóa dữ liệu số
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

print("\nHoàn tất chuẩn hóa dữ liệu!")

# 5. Huấn luyện mô hình với hiển thị chi tiết
print("\nBắt đầu huấn luyện mô hình Random Forest Regressor...")

# Khởi tạo mô hình với 100 cây (n_estimators=100)
model = RandomForestRegressor(n_estimators=100, random_state=42, warm_start=True)

mae_history = []  # Lưu lịch sử MAE sau mỗi lần huấn luyện

for i in range(1, 101, 10):  # Huấn luyện từng bước (tăng số cây mỗi lần 10 cây)
    model.set_params(n_estimators=i)  # Cập nhật số lượng cây trong rừng
    model.fit(X_train, y_train)  # Huấn luyện mô hình
    y_pred_partial = model.predict(X_test)  # Dự đoán trên tập kiểm tra
    mae_partial = mean_absolute_error(y_test, y_pred_partial)  # Tính MAE
    mae_history.append((i, mae_partial))  # Lưu lịch sử lỗi MAE

    print(f"Số cây: {i} | MAE: {mae_partial:.2f} tỷ")

print("Huấn luyện hoàn tất!")

# Hiển thị độ quan trọng của các đặc trưng
feature_importances = model.feature_importances_
print("\nĐộ quan trọng của các đặc trưng:")
for feature, importance in zip(X.columns, feature_importances):
    print(f"- {feature}: {importance:.4f}")

# 6. Dự đoán và đánh giá cuối cùng
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)

print(f"\nĐánh giá mô hình:")
print(f"- Mean Absolute Error (MAE): {mae:.2f} tỷ")

# 7. Hàm dự đoán giá nhà mới với quá trình hiển thị chi tiết
def du_doan_gia(loai_nha, vi_tri, dien_tich, so_phong, so_tang):
    print("\n=== Quá trình dự đoán giá nhà ===")
    
    # Bước 1: Mã hóa dữ liệu
    #Chuẩn hóa đầu vào để khớp với dữ liệu huấn luyện
    loai_nha = chuan_hoa_ten(loai_nha)
    vi_tri = chuan_hoa_ten(vi_tri)

    #Kiểm tra xem nhãn có tồn tại không
    if loai_nha not in label_encoder_loai.classes_:
        print(f"Lỗi: '{loai_nha}' không có trong danh sách mã hóa.")
        return "Không thể dự đoán"
    
    if vi_tri not in label_encoder_vi_tri.classes_:
        print(f"Lỗi: '{vi_tri}' không có trong danh sách mã hóa.")
        return "Không thể dự đoán"
    loai_nha_encoded = label_encoder_loai.transform([loai_nha])[0]
    vi_tri_encoded = label_encoder_vi_tri.transform([vi_tri])[0]
    print(f"Loại nhà ('{loai_nha}') được mã hóa thành: {loai_nha_encoded}")
    print(f"Vị trí ('{vi_tri}') được mã hóa thành: {vi_tri_encoded}")
    
    # Bước 2: Tạo DataFrame đầu vào
    input_df = pd.DataFrame([[loai_nha_encoded, vi_tri_encoded, dien_tich, so_phong, so_tang]], 
                            columns=X.columns)
    print("\nDữ liệu đầu vào trước khi chuẩn hóa:")
    print(input_df)
    
    # Bước 3: Chuẩn hóa dữ liệu
    input_scaled = scaler.transform(input_df)
    print("\nDữ liệu đầu vào sau khi chuẩn hóa:")
    print(input_scaled)
    
    # Bước 4: Dự đoán giá
    gia_du_doan = model.predict(input_scaled)[0]
    print(f"\nGiá nhà dự đoán: {gia_du_doan:.2f} tỷ")
    
    return f"{gia_du_doan:.2f} tỷ"

# Ví dụ dự đoán với hiển thị chi tiết
du_doan_gia("Nhà hẻm", "Quận 12", 60, 4, 4)

model_filename = "house_price_model.pkl"
scaler_filename = "scaler.pkl"

joblib.dump(model, model_filename)
joblib.dump(scaler, scaler_filename)

print(f"\nMô hình đã được lưu vào {model_filename}!")
print(f"Scaler đã được lưu vào {scaler_filename}!")

# Lưu LabelEncoder
joblib.dump(label_encoder_loai, "label_encoder_loai.pkl")
joblib.dump(label_encoder_vi_tri, "label_encoder_vi_tri.pkl")

# Lưu LabelEncoder
joblib.dump(label_encoder_loai_goc, "label_encoder_loai_goc.pkl")
joblib.dump(label_encoder_vi_tri_goc, "label_encoder_vi_tri_goc.pkl")

print("Đã lưu LabelEncoder!")

print("Các nhãn đã được mã hóa trước đó:", label_encoder_loai.classes_)
print("Các nhãn đã được mã hóa trước đó:", label_encoder_loai_goc.classes_)
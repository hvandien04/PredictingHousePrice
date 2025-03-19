from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)  # Cho phép React gọi API từ localhost khác

# Load model và các bộ mã hóa, chuẩn hóa
model = joblib.load("house_price_model.pkl")
scaler = joblib.load("scaler.pkl")
label_encoder_loai_goc = joblib.load("label_encoder_loai_goc.pkl")
label_encoder_vi_tri_goc = joblib.load("label_encoder_vi_tri_goc.pkl")
label_encoder_loai = joblib.load("label_encoder_loai.pkl")
label_encoder_vi_tri = joblib.load("label_encoder_vi_tri.pkl")

def recreate_label_encoder(file_path):
    with open(file_path, "rb") as file:
        data = pickle.load(file)

    if isinstance(data, (list, tuple)) or hasattr(data, "__array__"):
        # Tạo LabelEncoder mới
        label_encoder = LabelEncoder()
        label_encoder.fit(data)

        # Ghi đè file cũ
        with open(file_path, "wb") as file:
            pickle.dump(label_encoder, file)

        print(f"✅ Đã tạo lại {file_path} đúng định dạng!")
    else:
        print(f"⚠️ Dữ liệu trong {file_path} không hợp lệ!")

# Tạo lại cả hai label_encoder
recreate_label_encoder("label_encoder_vi_tri_goc.pkl")
recreate_label_encoder("label_encoder_loai_goc.pkl")

def load_labels(filename):
    with open(filename, "rb") as file:
        label_encoder = pickle.load(file)

    if isinstance(label_encoder, LabelEncoder):
        return [{"id": idx, "value": value, "label": value} for idx, value in enumerate(label_encoder.classes_)]
    else:
        raise ValueError(f"File {filename} không phải là một LabelEncoder hợp lệ.")

# API dự đoán giá nhà
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Nhận dữ liệu JSON từ React
    try:
        # Mã hóa dữ liệu đầu vào
        loai_nha_encoded = label_encoder_loai_goc.transform([data["loai_nha"]])[0]
        vi_tri_encoded = label_encoder_vi_tri_goc.transform([data["vi_tri"]])[0]

        # Chuẩn bị dữ liệu cho mô hình
        input_data = np.array([[loai_nha_encoded, vi_tri_encoded, data["dien_tich"], data["so_phong"], data["so_tang"]]])
        input_scaled = scaler.transform(input_data)

        # Dự đoán giá
        gia_du_doan = model.predict(input_scaled)[0]

        return jsonify({"gia_du_doan": f"{gia_du_doan:.2f} VND"})

    except Exception as e:
        return jsonify({"error": str(e)})

# API lấy danh sách loại nhà
@app.route('/house-types', methods=['GET'])
def get_house_types():
    house_types = load_labels("label_encoder_loai_goc.pkl")
    return jsonify(house_types)

# API lấy danh sách quận/huyện
@app.route('/districts', methods=['GET'])
def get_districts():
    districts = load_labels("label_encoder_vi_tri_goc.pkl")
    return jsonify(districts)

# Chạy Flask
if __name__ == "__main__":
    app.run(debug=True)

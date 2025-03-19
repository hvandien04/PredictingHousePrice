from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)  # Cho phép React gọi API từ localhost khác

# Load model đã huấn luyện
model = joblib.load("house_price_model.pkl")  # Lưu model khi huấn luyện xong
scaler = joblib.load("scaler.pkl")  # Load bộ scaler để chuẩn hóa dữ liệu
label_encoder_loai = joblib.load("label_encoder_loai.pkl")  # Load encoder loại nhà
label_encoder_vi_tri = joblib.load("label_encoder_vi_tri.pkl")  # Load encoder vị trí

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json  # Nhận dữ liệu JSON từ React
    try:
        # Mã hóa dữ liệu đầu vào
        loai_nha_encoded = label_encoder_loai.transform([data["loai_nha"]])[0]
        vi_tri_encoded = label_encoder_vi_tri.transform([data["vi_tri"]])[0]

        # Chuẩn bị dữ liệu cho mô hình
        input_data = np.array([[loai_nha_encoded, vi_tri_encoded, data["dien_tich"], data["so_phong"], data["so_tang"]]])
        input_scaled = scaler.transform(input_data)

        # Dự đoán giá
        gia_du_doan = model.predict(input_scaled)[0]

        return jsonify({"gia_du_doan": f"{gia_du_doan:.2f} VND"})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)

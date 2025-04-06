package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    // Các phương thức truy vấn tùy chỉnh nếu cần
}

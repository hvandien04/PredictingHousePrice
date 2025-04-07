package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, String> {
    boolean existsByPredictionID(String predictionID);
}
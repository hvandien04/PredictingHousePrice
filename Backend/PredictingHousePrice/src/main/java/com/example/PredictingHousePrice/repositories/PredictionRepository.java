package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {

}

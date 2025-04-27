package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Prediction;
import com.example.PredictingHousePrice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, String> {
    boolean existsByPredictionID(String predictionID);

    List<Prediction> findByUserID(User user);

    List<Prediction> findTop4ByOrderByDateDesc();
}
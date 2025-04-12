package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Predictedhouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PredictedhouseRepository extends JpaRepository<Predictedhouse, String> {
    boolean existsBypHouseID(String pHouseID);
    Optional<Predictedhouse> findByPredictionID_PredictionID(String predictionID);
}

package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Predictedhouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PredictedhouseRepository extends JpaRepository<Predictedhouse, String> {
    boolean existsBypHouseID(String pHouseID);
}

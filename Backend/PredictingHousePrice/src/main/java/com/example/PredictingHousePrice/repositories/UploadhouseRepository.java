package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Sellinghouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UploadhouseRepository extends JpaRepository<Sellinghouse, String> {
    boolean existsBypHouseID(String pHouseID);
}

package com.example.PredictingHousePrice.repository;

import com.example.PredictingHousePrice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerProfileRepository extends JpaRepository<User, String> {
    boolean existsByUserID(String userID);
}

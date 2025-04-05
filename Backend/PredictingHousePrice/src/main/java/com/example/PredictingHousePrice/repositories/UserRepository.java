package com.example.PredictingHousePrice.repositories;

import aj.org.objectweb.asm.commons.Remapper;
import com.example.PredictingHousePrice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    boolean existsByUserID(String userID);
}

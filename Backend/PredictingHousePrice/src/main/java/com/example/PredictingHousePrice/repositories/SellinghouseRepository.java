package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Prediction;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface SellinghouseRepository extends JpaRepository<Sellinghouse, String> {

    List<Sellinghouse> findByUserID(User user);

    // Tìm bán nhà theo ID
    Optional<Sellinghouse> findById(String id);

    // Tìm tất cả các bài đăng bán nhà
    List<Sellinghouse> findByStateContainingIgnoreCase(String state);

    // Xóa bài đăng bán nhà (được tự động hỗ trợ bởi JpaRepository)
    void deleteById(String id);
}

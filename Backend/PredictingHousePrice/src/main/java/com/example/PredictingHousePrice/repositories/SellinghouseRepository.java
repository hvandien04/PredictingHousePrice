package com.example.PredictingHousePrice.repositories;

import com.example.PredictingHousePrice.entities.Sellinghouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import java.util.Optional;

@Repository
public interface SellinghouseRepository extends JpaRepository<Sellinghouse, String> {

    // Tìm bán nhà theo ID
    Optional<Sellinghouse> findById(String id);

    // Tìm tất cả các bài đăng bán nhà
    List<Sellinghouse> findAll();

    // Xóa bài đăng bán nhà (được tự động hỗ trợ bởi JpaRepository)
    void deleteById(String id);
}

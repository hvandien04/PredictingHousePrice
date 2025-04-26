package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repository.SellerProfileRepository;
import com.example.PredictingHousePrice.dtos.SellerProfileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellerProfileService {

    @Autowired
    private SellerProfileRepository sellerProfileRepository;

    // Lấy thông tin người bán từ database
    public User getSellerProfileById(String sellerId) {
        return sellerProfileRepository.findById(sellerId).orElse(null);
    }

    // Cập nhật thông tin người bán
    public boolean updateSellerProfile(String sellerId, SellerProfileRequest sellerProfileRequest) {
        User seller = sellerProfileRepository.findById(sellerId).orElse(null);

        if (seller != null) {
            seller.setName(sellerProfileRequest.getName());
            seller.setEmail(sellerProfileRequest.getEmail());
            seller.setPhone(sellerProfileRequest.getPhone());
            sellerProfileRepository.save(seller);
            return true;
        }

        return false;
    }
}

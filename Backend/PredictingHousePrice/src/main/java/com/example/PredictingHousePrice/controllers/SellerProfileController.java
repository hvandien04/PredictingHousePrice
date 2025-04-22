package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.services.SellerProfileService;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.dtos.SellerProfileRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/seller")
public class SellerProfileController {

    @Autowired
    private SellerProfileService sellerProfileService;

    // API để lấy thông tin người bán
    @GetMapping("/{sellerId}")
    public ResponseEntity<User> getSellerProfile(@PathVariable("sellerId") String sellerId) {
        User seller = sellerProfileService.getSellerProfileById(sellerId);

        if (seller != null) {
            return new ResponseEntity<>(seller, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // API để cập nhật thông tin người bán
    @PutMapping("/{sellerId}")
    public ResponseEntity<String> updateSellerProfile(
            @PathVariable("sellerId") String sellerId,
            @RequestBody SellerProfileRequest sellerProfileRequest) {

        boolean updated = sellerProfileService.updateSellerProfile(sellerId, sellerProfileRequest);

        if (updated) {
            return new ResponseEntity<>("Thông tin người bán đã được cập nhật", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cập nhật thất bại", HttpStatus.BAD_REQUEST);
        }
    }
}

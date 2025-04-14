package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.dtos.UploadhouseRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.UploadhouseRepository;
import com.example.PredictingHousePrice.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/uploadhouse")
public class UploadhouseController {

    @Autowired
    private UploadhouseRepository uploadhouseRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public Sellinghouse createUploadhouse(@RequestBody UploadhouseRequest uploadhouseRequest, @RequestParam String userId) {
        User user = getUserById(userId);
        Sellinghouse uploadhouse = uploadhouseRequest.toEntity(user);
        return uploadhouseRepository.save(uploadhouse);
    }

    private User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId));
    }
}

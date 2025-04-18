package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.dtos.UploadhouseRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.SellinghouseRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.security.SecureRandom;

@Service
public class UploadhouseService {

    @Autowired
    private SellinghouseRepository sellinghouseRepository;

    // Tạo mã ngẫu nhiên dài 5 ký tự
    private String generateRandomCode(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public Sellinghouse uploadHouse(UploadhouseRequest request, HttpServletRequest httpRequest) {
        // Lấy user từ session
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            throw new IllegalStateException("User not logged in or session expired");
        }
        User user = (User) session.getAttribute("user");

        // Kiểm tra dữ liệu
        if (request.getTitle() == null || request.getTitle().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
        if (request.getHouseType() == null || request.getHouseType().isEmpty()) {
            throw new IllegalArgumentException("House type cannot be null or empty");
        }
        if (request.getArea() == null || request.getArea().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Area must be greater than 0");
        }
        if (request.getAddress() == null || request.getAddress().isEmpty()) {
            throw new IllegalArgumentException("Address cannot be null or empty");
        }
        if (request.getFloors() == null || request.getFloors() <= 0) {
            throw new IllegalArgumentException("Floors must be greater than 0");
        }
        if (request.getBedrooms() == null || request.getBedrooms() <= 0) {
            throw new IllegalArgumentException("Bedrooms must be greater than 0");
        }
        if (request.getBathrooms() == null || request.getBathrooms() <= 0) {
            throw new IllegalArgumentException("Bathrooms must be greater than 0");
        }
        if (request.getLegalStatus() == null || request.getLegalStatus().isEmpty()) {
            throw new IllegalArgumentException("Legal status cannot be null or empty");
        }
        if (request.getPrice() == null || request.getPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
        if (request.getDescription() == null || request.getDescription().isEmpty()) {
            throw new IllegalArgumentException("Description cannot be null or empty");
        }
        if (request.getImage() == null || request.getImage().isEmpty()) {
            throw new IllegalArgumentException("Image cannot be null or empty");
        }
        if (request.getState() == null || request.getState().isEmpty()) {
            throw new IllegalArgumentException("State cannot be null or empty");
        }

        // Tạo entity và lưu vào DB
        Sellinghouse house = new Sellinghouse();
        house.setPHouseID(generateRandomCode(5));
        house.setTitle(request.getTitle());
        house.setHouseType(request.getHouseType());
        house.setArea(request.getArea());
        house.setAddress(request.getAddress());
        house.setFloors(request.getFloors());
        house.setBedrooms(request.getBedrooms());
        house.setBathrooms(request.getBathrooms());
        house.setLegalStatus(request.getLegalStatus());
        house.setPrice(request.getPrice());
        house.setDescription(request.getDescription());
        house.setImage(request.getImage());
        house.setState(request.getState());
        house.setUserID(user);

        return sellinghouseRepository.save(house);
    }
}

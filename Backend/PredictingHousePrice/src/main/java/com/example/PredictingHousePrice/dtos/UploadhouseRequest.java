package com.example.PredictingHousePrice.dtos;

import java.math.BigDecimal;
import java.security.SecureRandom;

public class UploadhouseRequest {
    // Tạo mã ngẫu nhiên dài 5 ký tự
    private String generateRandomCode(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(chars.length());
            sb.append(chars.charAt(index));
        }

        return sb.toString();
    }

    private String title;
    private String houseType;
    private BigDecimal area;
    private String address;
    private Integer floors;
    private Integer bedrooms;
    private Integer bathrooms;
    private String legalStatus;
    private BigDecimal price;
    private String description;
    private String image;
    private String state;

    // Getters and setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHouseType() {
        return houseType;
    }

    public void setHouseType(String houseType) {
        this.houseType = houseType;
    }

    public BigDecimal getArea() {
        return area;
    }

    public void setArea(BigDecimal area) {
        this.area = area;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getFloors() {
        return floors;
    }

    public void setFloors(Integer floors) {
        this.floors = floors;
    }

    public Integer getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(Integer bedrooms) {
        this.bedrooms = bedrooms;
    }

    public Integer getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(Integer bathrooms) {
        this.bathrooms = bathrooms;
    }

    public String getLegalStatus() {
        return legalStatus;
    }

    public void setLegalStatus(String legalStatus) {
        this.legalStatus = legalStatus;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    // In ra dữ liệu trước khi chuyển đổi
    public void printDetails() {
        System.out.println("Title: " + this.title);
        System.out.println("House Type: " + this.houseType);
        System.out.println("Area: " + this.area);
        System.out.println("Address: " + this.address);
        System.out.println("Floors: " + this.floors);
        System.out.println("Bedrooms: " + this.bedrooms);
        System.out.println("Bathrooms: " + this.bathrooms);
        System.out.println("Legal Status: " + this.legalStatus);
        System.out.println("Price: " + this.price);
        System.out.println("Description: " + this.description);
        System.out.println("Image: " + this.image);
        System.out.println("State: " + this.state);
    }

    // Chuyển đổi DTO sang Entity
    public com.example.PredictingHousePrice.entities.Sellinghouse toEntity(com.example.PredictingHousePrice.entities.User user) {
        // In ra dữ liệu trước khi chuyển đổi
        printDetails();

        // Kiểm tra dữ liệu đầu vào
        if (this.title == null || this.title.isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
        if (this.houseType == null || this.houseType.isEmpty()) {
            throw new IllegalArgumentException("House type cannot be null or empty");
        }
        if (this.area == null || this.area.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Area must be greater than 0");
        }
        if (this.address == null || this.address.isEmpty()) {
            throw new IllegalArgumentException("Address cannot be null or empty");
        }
        if (this.floors == null || this.floors <= 0) {
            throw new IllegalArgumentException("Floors must be greater than 0");
        }
        if (this.bedrooms == null || this.bedrooms <= 0) {
            throw new IllegalArgumentException("Bedrooms must be greater than 0");
        }
        if (this.bathrooms == null || this.bathrooms <= 0) {
            throw new IllegalArgumentException("Bathrooms must be greater than 0");
        }
        if (this.legalStatus == null || this.legalStatus.isEmpty()) {
            throw new IllegalArgumentException("Legal status cannot be null or empty");
        }
        if (this.price == null || this.price.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
        if (this.description == null || this.description.isEmpty()) {
            throw new IllegalArgumentException("Description cannot be null or empty");
        }
        if (this.image == null || this.image.isEmpty()) {
            throw new IllegalArgumentException("Image cannot be null or empty");
        }
        if (this.state == null || this.state.isEmpty()) {
            throw new IllegalArgumentException("State cannot be null or empty");
        }
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }

        // Nếu tất cả kiểm tra hợp lệ, chuyển dữ liệu sang Entity
        com.example.PredictingHousePrice.entities.Sellinghouse sellinghouse = new com.example.PredictingHousePrice.entities.Sellinghouse();
        sellinghouse.setPHouseID(generateRandomCode(5));
        sellinghouse.setTitle(this.title);
        sellinghouse.setHouseType(this.houseType);
        sellinghouse.setArea(this.area);
        sellinghouse.setAddress(this.address);
        sellinghouse.setFloors(this.floors);
        sellinghouse.setBedrooms(this.bedrooms);
        sellinghouse.setBathrooms(this.bathrooms);
        sellinghouse.setLegalStatus(this.legalStatus);
        sellinghouse.setPrice(this.price);
        sellinghouse.setDescription(this.description);
        sellinghouse.setImage(this.image);
        sellinghouse.setState(this.state);
        sellinghouse.setUserID(user);

        return sellinghouse;
    }
}

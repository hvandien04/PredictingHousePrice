package com.example.PredictingHousePrice.dtos;

import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.entities.User;

import java.math.BigDecimal;

public class SellinghouseRequest {
    private String pHouseID;
    private String title;
    private String houseType;
    private String image;
    private String address;
    private int bedrooms;
    private int floors;
    private int bathrooms;
    private String legalStatus;
    private BigDecimal price;
    private BigDecimal area;
    private String description;
    private String state;
    private String userID;

    public SellinghouseRequest(Sellinghouse entity) {
        this.pHouseID = entity.getPHouseID();
        this.title = entity.getTitle();
        this.houseType = entity.gethouseType();
        this.image = entity.getImage();
        this.address = entity.getAddress();
        this.bedrooms = entity.getBedrooms() != null ? entity.getBedrooms() : 0;
        this.floors = entity.getFloors() != null ? entity.getFloors() : 0;
        this.bathrooms = entity.getBathrooms() != null ? entity.getBathrooms() : 0;
        this.price = entity.getPrice() != null ? entity.getPrice() : BigDecimal.ZERO;
        this.area = entity.getArea() != null ? entity.getArea() : BigDecimal.ZERO;
        this.legalStatus = entity.getLegalStatus();
        this.description = entity.getDescription();
        this.state = entity.getState();
        this.userID = entity.getUserID() != null ? entity.getUserID().getUserID() : null;

    }

    // Getters và Setters
    public String getpHouseID() {
        return pHouseID;
    }

    public void setpHouseID(String pHouseID) {
        this.pHouseID = pHouseID;
    }

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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getBedrooms() {
        return bedrooms;
    }

    public void setBedrooms(int bedrooms) {
        this.bedrooms = bedrooms;
    }

    public int getFloors() {
        return floors;
    }

    public void setFloors(int floors) {
        this.floors = floors;
    }

    public int getBathrooms() {
        return bathrooms;
    }

    public void setBathrooms(int bathrooms) {
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

    public BigDecimal getArea() {
        return area;
    }

    public void setArea(BigDecimal area) {
        this.area = area;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

}
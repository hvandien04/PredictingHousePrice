package com.example.PredictingHousePrice.dtos;

import com.example.PredictingHousePrice.entities.Sellinghouse;

public class CompareRequest {

    private String pHouseID;
    private String title;
    private String houseType;
    private String image;
    private String address;
    private int bedrooms;
    private int floors;
    private double price;
    private double area;
    private String legalstatus;

    public CompareRequest(Sellinghouse entity) {
        this.pHouseID = entity.getPHouseID();
        this.title = entity.getTitle();
        this.houseType = entity.gethouseType();
        this.image = entity.getImage();
        this.address = entity.getAddress();
        this.bedrooms = entity.getBedrooms() != null ? entity.getBedrooms() : 0;
        this.floors = entity.getFloors() != null ? entity.getFloors() : 0;
        this.price = entity.getPrice() != null ? entity.getPrice().doubleValue() : 0;
        this.area = entity.getArea() != null ? entity.getArea().doubleValue() : 0;
        this.legalstatus = entity.getLegalStatus();
    }

    // Getters and Setters

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

    public String gethouseType() {
        return houseType;
    }

    public void sethouseType(String houseType) {
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

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }

    public String getLegalstatus() {
        return legalstatus;
    }

    public void setLegalstatus(String legalstatus) {
        this.legalstatus = legalstatus;
    }
}

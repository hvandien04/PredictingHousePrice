package com.example.PredictingHousePrice.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public class HousePredictionRequest {
    // Prediction data
    private String predictionID;
    private LocalDate date;
    private BigDecimal predictedPrice;
    private Float confidenceScore;

    // Predictedhouse data
    private String pHouseID;
    private String houseType;
    private BigDecimal area;
    private String address;
    private Integer floors;
    private Integer bedrooms;

    // Getter and Setter methods
    public String getPredictionID() {
        return predictionID;
    }

    public void setPredictionID(String predictionID) {
        this.predictionID = predictionID;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getPredictedPrice() {
        return predictedPrice;
    }

    public void setPredictedPrice(BigDecimal predictedPrice) {
        this.predictedPrice = predictedPrice;
    }

    public Float getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(Float confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getpHouseID() {
        return pHouseID;
    }

    public void setpHouseID(String pHouseID) {
        this.pHouseID = pHouseID;
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
}

package com.example.PredictingHousePrice.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "predictedhouse")
public class Predictedhouse {
    @Id
    @Column(name = "PHouseID", nullable = false, length = 30)
    private String pHouseID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PredictionID")
    private com.example.PredictingHousePrice.entities.Prediction predictionID;

    @Column(name = "HouseType", length = 50)
    private String houseType;

    @Column(name = "Area", precision = 10, scale = 2)
    private BigDecimal area;

    @Column(name = "Address", length = 200)
    private String address;

    @Column(name = "Floors")
    private Integer floors;

    @Column(name = "Bedrooms")
    private Integer bedrooms;

    public String getPHouseID() {
        return pHouseID;
    }

    public void setPHouseID(String pHouseID) {
        this.pHouseID = pHouseID;
    }

    public com.example.PredictingHousePrice.entities.Prediction getPredictionID() {
        return predictionID;
    }

    public void setPredictionID(com.example.PredictingHousePrice.entities.Prediction predictionID) {
        this.predictionID = predictionID;
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
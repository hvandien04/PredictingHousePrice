package com.example.PredictingHousePrice.entities;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "sellinghouse")
public class Sellinghouse {
    @Id
    @Column(name = "PHouseID", nullable = false, length = 30)
    private String pHouseID;

    @Column(name = "Title", length = 200)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private com.example.PredictingHousePrice.entities.User userID;

    @Column(name = "Area", precision = 10, scale = 2)
    private BigDecimal area;

    @Column(name = "Address", length = 200)
    private String address;

    @Column(name = "Floors")
    private Integer floors;

    @Column(name = "Bedrooms")
    private Integer bedrooms;

    @Column(name = "Bathrooms")
    private Integer bathrooms;

    @Column(name = "LegalStatus", length = 50)
    private String legalStatus;

    @Column(name = "Price", precision = 15, scale = 2)
    private BigDecimal price;

    @Lob
    @Column(name = "Description")
    private String description;

    @Column(name = "Image", length = 200)
    private String image;

    @Column(name = "State", length = 50)
    private String state;

    public String getPHouseID() {
        return pHouseID;
    }

    public void setPHouseID(String pHouseID) {
        this.pHouseID = pHouseID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public com.example.PredictingHousePrice.entities.User getUserID() {
        return userID;
    }

    public void setUserID(com.example.PredictingHousePrice.entities.User userID) {
        this.userID = userID;
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

}
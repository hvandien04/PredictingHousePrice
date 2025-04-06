package com.example.PredictingHousePrice.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import java.util.Date;

@Entity
@Table(name = "prediction")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "PredictionID")
    private String predictionID;

    @Column(name = "UserID")
    private String userID;

    @Column(name = "Date")
    private Date date;

    @Column(name = "Time")
    private Date time;

    @Column(name = "Location")
    @NotEmpty(message = "Location cannot be empty")
    private String location;

    @Column(name = "Area")
    @Min(value = 0, message = "Area must be a positive number")
    private double area;

    @Column(name = "Rooms")
    @Min(value = 1, message = "Number of rooms must be greater than or equal to 1")
    private int rooms;

    @Column(name = "Floors")
    @Min(value = 1, message = "Number of floors must be greater than or equal to 1")
    private int floors;

    @Column(name = "PredictedPrice")
    @Min(value = 0, message = "Predicted price must be a positive number")
    private double predictedPrice;

    @Column(name = "ConfidenceScore")
    @Min(value = 0, message = "Accuracy must be a positive number")
    private double confidenceScore;

    // Getter and Setter methods
    public String getPredictionID() {
        return predictionID;
    }

    public void setPredictionID(String predictionID) {
        this.predictionID = predictionID;
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getArea() {
        return area;
    }

    public void setArea(double area) {
        this.area = area;
    }

    public int getRooms() {
        return rooms;
    }

    public void setRooms(int rooms) {
        this.rooms = rooms;
    }

    public int getFloors() {
        return floors;
    }

    public void setFloors(int floors) {
        this.floors = floors;
    }

    public double getPredictedPrice() {
        return predictedPrice;
    }

    public void setPredictedPrice(double predictedPrice) {
        this.predictedPrice = predictedPrice;
    }

    public double getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(double confidenceScore) {
        this.confidenceScore = confidenceScore;
    }
}

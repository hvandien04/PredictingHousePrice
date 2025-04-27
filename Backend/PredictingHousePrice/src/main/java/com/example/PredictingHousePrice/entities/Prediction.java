package com.example.PredictingHousePrice.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "prediction")
public class Prediction {
    @Id
    @Column(name = "PredictionID", nullable = false, length = 50)
    private String predictionID;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "UserID")
    private com.example.PredictingHousePrice.entities.User userID;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "PredictedPrice", precision = 15, scale = 2)
    private BigDecimal predictedPrice;

    @Column(name = "ConfidenceScore")
    private Float confidenceScore;

    public String getPredictionID() {
        return predictionID;
    }

    public void setPredictionID(String predictionID) {
        this.predictionID = predictionID;
    }

    public com.example.PredictingHousePrice.entities.User getUserID() {
        return userID;
    }

    public void setUserID(com.example.PredictingHousePrice.entities.User userID) {
        this.userID = userID;
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

}
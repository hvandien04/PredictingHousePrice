package com.example.PredictingHousePrice.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "feedback")
public class Feedback {
    @Id
    @Column(name = "FeedbackID", nullable = false, length = 50)
    private String feedbackID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    private com.example.PredictingHousePrice.entities.User userID;

    @Column(name = "Date")
    private LocalDate date;

    @Column(name = "Message", length = 200)
    private String message;

    @Column(name = "Title", length = 200)
    private String title;

    @Column(name = "status")
    private String status;

    public String getFeedbackID() {
        return feedbackID;
    }

    public void setFeedbackID(String feedbackID) {
        this.feedbackID = feedbackID;
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

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }



}
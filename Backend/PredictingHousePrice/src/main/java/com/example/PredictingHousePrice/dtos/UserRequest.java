package com.example.PredictingHousePrice.dtos;

public class UserRequest {
    private String userID;
    private String name;
    private String email;
    private String phone;
    private String role;
    private String state;

    // Getters & Setters


    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }


    public String getPhone() {
        return phone;
    }

    public String getRole() {
        return role;
    }

    public String getState() {
        return state;
    }
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setState(String state) {
        this.state = state;
    }
}

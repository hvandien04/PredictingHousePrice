package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.entities.Prediction;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.PredictionRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import jakarta.validation.Valid;  // Đảm bảo dùng Jakarta Validation
import java.util.Collections;

@RestController
@RequestMapping("/api/prediction")
public class PredictionController {

    @Autowired
    private PredictionRepository predictionRepository;

    @PostMapping("/save-prediction")
    public ResponseEntity<?> savePrediction(@Valid @RequestBody Prediction predictionRequest,
                                            BindingResult bindingResult, HttpServletRequest request) {
        System.out.println("✅ Nhận predictionRequest:");
        System.out.println("Location: " + predictionRequest.getLocation());
        System.out.println("Area: " + predictionRequest.getArea());
        System.out.println("Rooms: " + predictionRequest.getRooms());
        System.out.println("Floors: " + predictionRequest.getFloors());
        System.out.println("PredictedPrice: " + predictionRequest.getPredictedPrice());
        System.out.println("ConfidenceScore: " + predictionRequest.getConfidenceScore());
        System.out.println("Date: " + predictionRequest.getDate());
        System.out.println("Time: " + predictionRequest.getTime());
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            for (FieldError fieldError : bindingResult.getFieldErrors()) {
                errorMessage.append(fieldError.getDefaultMessage()).append("\n");
            }
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        User currentUser = (User) request.getSession().getAttribute("user");
        if (currentUser == null) {
            return ResponseEntity.status(401).body("User not logged in");
        }

        String userID = currentUser.getUserID();

        // Set current user in the prediction
        Prediction prediction = new Prediction();
        prediction.setUserID(userID);
        prediction.setLocation(predictionRequest.getLocation());
        prediction.setArea(predictionRequest.getArea());
        prediction.setRooms(predictionRequest.getRooms());
        prediction.setFloors(predictionRequest.getFloors());
        prediction.setPredictedPrice(predictionRequest.getPredictedPrice());
        prediction.setConfidenceScore(predictionRequest.getConfidenceScore());
        prediction.setDate(predictionRequest.getDate());
        prediction.setTime(predictionRequest.getTime());

        try {
            predictionRepository.save(prediction);
            return ResponseEntity.ok(Collections.singletonMap("message", "Prediction saved successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving prediction: " + e.getMessage());
        }
    }

    @GetMapping("/get-user-id")
    public ResponseEntity<?> getUserId(HttpServletRequest request) {
        User currentUser = (User) request.getSession().getAttribute("user");
        if (currentUser != null) {
            return ResponseEntity.ok(Collections.singletonMap("user_id", currentUser.getUserID()));
        } else {
            return ResponseEntity.status(401).body("User not logged in");
        }
    }
}

package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.dtos.HousePredictionRequest;
import com.example.PredictingHousePrice.entities.Predictedhouse;
import com.example.PredictingHousePrice.services.PredictionService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prediction")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    // API to create a new prediction
    @PostMapping("/create")
    public Predictedhouse createHousePrediction(@RequestBody HousePredictionRequest request, HttpServletRequest ServletRequest) {
        if (request == null) {
            throw new IllegalArgumentException("Request cannot be null");
        }
        // Truyền ServletRequest vào phương thức HousePredictionFull
        return predictionService.createHousePrediction(request, ServletRequest);
    }

    @GetMapping("/history")
    public List<HousePredictionRequest> getPredictionsByUser(HttpServletRequest request) {
        return predictionService.getHouseByUserID(request);
    }

    @GetMapping("/recent-history")
    public List<HousePredictionRequest> getTop4Predictions() {
        return predictionService.getTop4Houses();
    }
}

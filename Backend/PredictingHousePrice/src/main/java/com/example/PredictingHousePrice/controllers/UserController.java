package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.entities.Prediction;
import com.example.PredictingHousePrice.entities.Predictedhouse;
import com.example.PredictingHousePrice.repositories.PredictionRepository;
import com.example.PredictingHousePrice.repositories.PredictedhouseRepository;
import com.example.PredictingHousePrice.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthService authService;
    private final PredictionRepository predictionRepository;
    private final PredictedhouseRepository predictedhouseRepository;

    public UserController(AuthService authService, PredictionRepository predictionRepository, PredictedhouseRepository predictedhouseRepository) {
        this.authService = authService;
        this.predictionRepository = predictionRepository;
        this.predictedhouseRepository = predictedhouseRepository;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> userDashboard(HttpServletRequest request) {
        com.example.PredictingHousePrice.entities.User currentUser = authService.getCurrentUser(request);
        if (currentUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }

        String userId = currentUser.getUserID();
        // Lấy dự đoán của user hiện tại
        List<Prediction> userPredictions = predictionRepository.findAll().stream()
                .filter(prediction -> prediction.getUserID() != null && prediction.getUserID().getUserID().equals(userId))
                .collect(Collectors.toList());

        // Tổng số dự đoán
        int totalPredictions = userPredictions.size();

        // Độ chính xác trung bình
        double averageAccuracy = userPredictions.stream()
                .filter(p -> p.getConfidenceScore() != null)
                .mapToDouble(Prediction::getConfidenceScore)
                .average()
                .orElse(0.0);

        // Giá trung bình
        double averagePrice = userPredictions.stream()
                .filter(p -> p.getPredictedPrice() != null)
                .mapToDouble(p -> p.getPredictedPrice().doubleValue())
                .average()
                .orElse(0.0);

        // Thống kê theo tháng
        List<Map<String, Object>> monthlyPredictions = getMonthlyPredictionStats(userPredictions);

        // Dự đoán gần đây (6 bản ghi mới nhất)
        List<Map<String, Object>> recentPredictions = userPredictions.stream()
                .sorted(Comparator.comparing(Prediction::getDate, Comparator.nullsLast(Comparator.reverseOrder())))
                .limit(6)
                .map(p -> {
                    Map<String, Object> pred = new HashMap<>();
                    Optional<Predictedhouse> house = predictedhouseRepository.findByPredictionID_PredictionID(p.getPredictionID());
                    pred.put("location", house.isPresent() ? house.get().getAddress() : "N/A");
                    pred.put("type", house.isPresent() ? house.get().getHouseType() : "N/A");
                    pred.put("price", p.getPredictedPrice() != null ? String.format("%.1f", p.getPredictedPrice().doubleValue() / 1_000_000_000) : "0");
                    pred.put("date", p.getDate() != null ? p.getDate().toString() : "N/A");
                    return pred;
                })
                .collect(Collectors.toList());

        // Phân bố giá nhà
        List<Map<String, Object>> priceDistribution = getPriceDistribution(userPredictions);

        // Xu hướng giá trung bình theo tháng
        List<Map<String, Object>> timelineData = getTimelineData(userPredictions);

        // Response JSON
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("totalPredictions", totalPredictions);
        dashboardData.put("accuracy", String.format("%.2f%%", averageAccuracy * 100));
        dashboardData.put("averagePrice", String.format("%.2fB", averagePrice / 1_000_000_000));
        dashboardData.put("monthlyPredictions", monthlyPredictions);
        dashboardData.put("recentPredictions", recentPredictions);
        dashboardData.put("priceDistribution", priceDistribution);
        dashboardData.put("timelineData", timelineData);

        return ResponseEntity.ok(dashboardData);
    }

    private List<Map<String, Object>> getMonthlyPredictionStats(List<Prediction> predictions) {
        List<Map<String, Object>> monthlyData = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", "T" + i);
            monthData.put("count", 0);
            monthlyData.add(monthData);
        }

        Map<Integer, Long> predictionByMonth = predictions.stream()
                .filter(p -> p.getDate() != null)
                .collect(Collectors.groupingBy(p -> p.getDate().getMonthValue(), Collectors.counting()));

        predictionByMonth.forEach((month, count) -> monthlyData.get(month - 1).put("count", count.intValue()));
        return monthlyData;
    }

    private List<Map<String, Object>> getPriceDistribution(List<Prediction> predictions) {
        Map<String, Integer> ranges = new LinkedHashMap<>();
        ranges.put("Dưới 2 tỷ", 0);
        ranges.put("2-4 tỷ", 0);
        ranges.put("4-6 tỷ", 0);
        ranges.put("6-8 tỷ", 0);
        ranges.put("8-10 tỷ", 0);
        ranges.put("Trên 10 tỷ", 0);

        for (Prediction p : predictions) {
            if (p.getPredictedPrice() == null) continue;
            double priceInBillions = p.getPredictedPrice().doubleValue() / 1_000_000_000;
            if (priceInBillions < 2) ranges.put("Dưới 2 tỷ", ranges.get("Dưới 2 tỷ") + 1);
            else if (priceInBillions < 4) ranges.put("2-4 tỷ", ranges.get("2-4 tỷ") + 1);
            else if (priceInBillions < 6) ranges.put("4-6 tỷ", ranges.get("4-6 tỷ") + 1);
            else if (priceInBillions < 8) ranges.put("6-8 tỷ", ranges.get("6-8 tỷ") + 1);
            else if (priceInBillions < 10) ranges.put("8-10 tỷ", ranges.get("8-10 tỷ") + 1);
            else ranges.put("Trên 10 tỷ", ranges.get("Trên 10 tỷ") + 1);
        }

        return ranges.entrySet().stream()
                .map(e -> {
                    Map<String, Object> range = new HashMap<>();
                    range.put("range", e.getKey());
                    range.put("count", e.getValue());
                    return range;
                })
                .collect(Collectors.toList());
    }

    private List<Map<String, Object>> getTimelineData(List<Prediction> predictions) {
        Map<String, DoubleSummaryStatistics> monthlyStats = predictions.stream()
                .filter(p -> p.getDate() != null && p.getPredictedPrice() != null)
                .collect(Collectors.groupingBy(
                        p -> "T" + p.getDate().getMonthValue() + "/" + p.getDate().getYear(),
                        Collectors.summarizingDouble(p -> p.getPredictedPrice().doubleValue() / 1_000_000_000)
                ));

        return monthlyStats.entrySet().stream()
                .map(e -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("date", e.getKey());
                    data.put("averagePrice", String.format("%.1f", e.getValue().getAverage()));
                    return data;
                })
                .sorted(Comparator.comparing(m -> m.get("date").toString()))
                .collect(Collectors.toList());
    }
}
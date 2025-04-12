package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.entities.Prediction;
import com.example.PredictingHousePrice.entities.Predictedhouse;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.PredictionRepository;
import com.example.PredictingHousePrice.repositories.PredictedhouseRepository;
import com.example.PredictingHousePrice.repositories.UserRepository;
import com.example.PredictingHousePrice.services.AuthService;
import com.example.PredictingHousePrice.services.UserService;
import com.example.PredictingHousePrice.services.SellinghouseService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.example.PredictingHousePrice.dtos.UserRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import java.util.List;
import com.example.PredictingHousePrice.dtos.SellinghouseRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AuthService authService;
    private final PredictionRepository predictionRepository;
    private final PredictedhouseRepository predictedhouseRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final SellinghouseService sellinghouseService;

    public AdminController(AuthService authService, PredictionRepository predictionRepository,
                           PredictedhouseRepository predictedhouseRepository, UserRepository userRepository,
                           UserService userService, SellinghouseService sellinghouseService) {
        this.authService = authService;
        this.userService = userService;
        this.sellinghouseService = sellinghouseService;
        this.predictionRepository = predictionRepository;
        this.predictedhouseRepository = predictedhouseRepository;
        this.userRepository = userRepository;
        System.out.println("UserRepository injected: " + (userRepository != null));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> adminDashboard(HttpServletRequest request) {
        if (!authService.isAdmin(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }

        // Lấy tất cả dự đoán
        List<Prediction> userPredictions = predictionRepository.findAll();

        // Tổng số dự đoán
        int totalPredictions = userPredictions.size();

        // Tổng số user
        long totalUsers = userRepository.count();
        System.out.println("Total users: " + totalUsers);

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

        // Thống kê hiệu suất user theo ngày (7 ngày gần nhất)
        List<Map<String, Object>> userPerformance = getUserPerformanceStats(userPredictions);

        // Response JSON
        Map<String, Object> dashboardData = new HashMap<>();
        dashboardData.put("totalPredictions", totalPredictions);
        dashboardData.put("totalUsers", totalUsers);
        dashboardData.put("accuracy", String.format("%.2f%%", averageAccuracy * 100));
        dashboardData.put("averagePrice", String.format("%.2fB", averagePrice / 1_000_000_000));
        dashboardData.put("monthlyPredictions", monthlyPredictions);
        dashboardData.put("recentPredictions", recentPredictions);
        dashboardData.put("priceDistribution", priceDistribution);
        dashboardData.put("timelineData", timelineData);
        dashboardData.put("userPerformance", userPerformance);

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

    private List<Map<String, Object>> getUserPerformanceStats(List<Prediction> predictions) {
        // Lấy 7 ngày gần nhất
        LocalDate today = LocalDate.now();
        LocalDate startDate = today.minusDays(6);
        List<String> dateLabels = new ArrayList<>();
        for (int i = 0; i < 7; i++) {
            dateLabels.add(startDate.plusDays(i).format(DateTimeFormatter.ISO_LOCAL_DATE));
        }

        // Lấy tất cả user
        List<User> users = userRepository.findAll();

        // Thống kê dự đoán theo user và ngày
        Map<String, Map<String, Long>> userPredictionCounts = predictions.stream()
                .filter(p -> p.getDate() != null && !p.getDate().isBefore(startDate))
                .collect(Collectors.groupingBy(
                        p -> p.getUserID().getUserID(),
                        Collectors.groupingBy(
                                p -> p.getDate().format(DateTimeFormatter.ISO_LOCAL_DATE),
                                Collectors.counting()
                        )
                ));

        // Chuẩn bị dữ liệu cho mỗi user
        List<Map<String, Object>> userPerformance = new ArrayList<>();
        for (User user : users) {
            Map<String, Object> userData = new HashMap<>();
            userData.put("userID", user.getUserID());
            userData.put("name", user.getName());

            List<Map<String, Object>> predictionsByDate = new ArrayList<>();
            for (String date : dateLabels) {
                Map<String, Object> dateData = new HashMap<>();
                dateData.put("date", date);
                dateData.put("count", userPredictionCounts.getOrDefault(user.getUserID(), new HashMap<>()).getOrDefault(date, 0L));
                predictionsByDate.add(dateData);
            }

            userData.put("predictionsByDate", predictionsByDate);
            userPerformance.add(userData);
        }

        return userPerformance;
    }

    // 1. Lấy danh sách người dùng
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(HttpServletRequest request) {
        if (!authService.isAdmin(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // 2. Thêm người dùng
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody UserRequest user, HttpServletRequest request) {
        if (!authService.isAdmin(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }


    // 3. Cập nhật người dùng
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable String id, @RequestBody UserRequest user, HttpServletRequest request) {
        if (!authService.isAdmin(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        var updated = userService.updateUser(id, user);
        return (updated != null)
                ? ResponseEntity.ok(updated)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }


    // 4. Xóa người dùng
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id, HttpServletRequest request) {
        if (!authService.isAdmin(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        boolean deleted = userService.deleteUser(id);
        return (deleted)
                ? ResponseEntity.ok("User deleted")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
    // --- Sellinghouse Management ---
    @GetMapping("/sellinghouses")
    public ResponseEntity<List<Sellinghouse>> getAllHouses(HttpServletRequest request) {
        if (!authService.isAdmin(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        List<Sellinghouse> houses = sellinghouseService.getAllHouses();
        return ResponseEntity.ok(houses);  // Đảm bảo trả về List<Sellinghouse> đúng kiểu
    }


    @PostMapping("/sellinghouses")
    public ResponseEntity<Sellinghouse> createHouse(@RequestBody SellinghouseRequest request, HttpServletRequest httpServletRequest) {
        if (!authService.isAdmin(httpServletRequest)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        Sellinghouse house = sellinghouseService.createHouse(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(house);
    }

    @PutMapping("/sellinghouses/{id}")
    public ResponseEntity<Sellinghouse> updateHouse(@PathVariable String id, @RequestBody SellinghouseRequest request, HttpServletRequest httpServletRequest) {
        if (!authService.isAdmin(httpServletRequest)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        Sellinghouse house = sellinghouseService.updateHouse(id, request);
        return house != null
                ? ResponseEntity.ok(house)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }


    @DeleteMapping("/sellinghouses/{id}")
    public ResponseEntity<String> deleteHouse(@PathVariable String id, HttpServletRequest httpServletRequest) {
        if (!authService.isAdmin(httpServletRequest)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        boolean deleted = sellinghouseService.deleteHouse(id);
        return deleted
                ? ResponseEntity.ok("House deleted successfully")
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("House not found");
    }

}

package com.example.PredictingHousePrice.controllers;

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

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AuthService authService;
    private final UserService userService;
    private final SellinghouseService sellinghouseService;

    public AdminController(AuthService authService , UserService userService, SellinghouseService sellinghouseService) {
        this.authService = authService;
        this.userService = userService;
        this.sellinghouseService = sellinghouseService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<?> adminDashboard(HttpServletRequest request) {
        if (!authService.isAdmin(request)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied");
        }
        return ResponseEntity.ok("Admin dashboard");
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
package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.dtos.*;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.services.AuthService;
import com.example.PredictingHousePrice.services.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    private final ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request, HttpServletRequest httpRequest) {
        return ResponseEntity.ok(authService.login(request, httpRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        return ResponseEntity.ok(authService.logout(request));
    }

    @PutMapping("/update-password")
    public ResponseEntity<Map<String, Object>> updatePassword(@RequestBody UpdatePasswordRequest request, HttpServletRequest httpRequest) {
        return authService.updatePassword(request, httpRequest);
    }

    @GetMapping("/session")
    public ResponseEntity<Map<String, Object>> getSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Map<String, Object> response = new HashMap<>();

        // Kiểm tra nếu session tồn tại và có thuộc tính "user"
        if (session != null && session.getAttribute("user") != null) {
            User user = (User) session.getAttribute("user");

            // Trả về thông báo và đối tượng người dùng trong Map
            response.put("message", "User is logged in!");
            response.put("user", user);
        } else {
            response.put("message", "No active session found!");
            response.put("user", null);
        }

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update-profile")
    public ResponseEntity<String> updateProfile(@RequestBody UpdateProfileRequest request, HttpServletRequest httpRequest) {
        return authService.updateProfile(request, httpRequest);
    }
    @PostMapping("/send-reset-code")
    public ResponseEntity<?> sendResetCode(@RequestBody EmailRequest request) {
        try {
            authService.sendResetCode(request.getEmail());
            return ResponseEntity.ok("Mã xác nhận đã được gửi tới email.");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Gửi email thất bại: " + e.getMessage());
        }
    }

    @PostMapping("/verify-reset-code")
    public ResponseEntity<?> verifyResetCode(@RequestBody VerifyCodeRequest request) {
        boolean isValid = authService.verifyCode(request.getEmail(), request.getCode());
        Map<String, Object> response = new HashMap<>();

        if (isValid) {
            response.put("status", "success");
            response.put("message","Mã xác nhận hợp lệ");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(400).body("Mã xác nhận không hợp lệ hoặc đã hết hạn.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean isValid = authService.verifyCode(request.getEmail(), request.getCode());
        Map<String, Object> response = new HashMap<>();

        if (isValid) {
            authService.resetPassword(request.getEmail(), request.getNewPassword());
            authService.clearCode(request.getEmail());
            response.put("status", "success");
            response.put("message","Đổi mật khẩu thành công");
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(400).body("Mã xác nhận không hợp lệ hoặc đã hết hạn.");
        }
    }
}

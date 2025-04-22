package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.dtos.LoginRequest;
import com.example.PredictingHousePrice.dtos.RegisterRequest;
import com.example.PredictingHousePrice.dtos.UpdatePasswordRequest;
import com.example.PredictingHousePrice.dtos.UpdateProfileRequest;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;


@Service
public class AuthService {
    public final UserRepository userRepository;
    private final EmailService emailService;
    private final ConcurrentHashMap<String, String> verificationCodes = new ConcurrentHashMap<>();

    public final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static final String ROLE_ADMIN = "1";
    public static final String ROLE_USER = "0";


    public AuthService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    private String generateRandomUserId() {
        String userId;
        do {
            userId = "U" + UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
        } while (userRepository.existsByUserID(userId));
        return userId;
    }


    public String login(LoginRequest loginRequest, HttpServletRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                HttpSession session = request.getSession();
                session.setAttribute("user", user);
                return "login success";
            }
        }
        return "login failed";
    }

    public ResponseEntity<?> register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email đã tồn tại");
        }

        String password = request.getPassword();
        String regex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
        if (!Pattern.matches(regex, password)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ và số.");
        }

        User user = new User();
        user.setUserID(generateRandomUserId());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setRole("0");
        user.setState("Active");

        userRepository.save(user);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Đăng ký thành công!");
    }

    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "Logged out successfully!";
    }

    // Kiểm tra role hiện tại
    public boolean hasRole(HttpServletRequest request, String requiredRole) {
        User user = getCurrentUser(request);
        return user != null && user.getRole().equals(requiredRole);
    }

    // Kiểm tra nhiều role
    public boolean hasAnyRole(HttpServletRequest request, String... roles) {
        User user = getCurrentUser(request);
        if (user == null) return false;

        for (String role : roles) {
            if (user.getRole().equals(role)) {
                return true;
            }
        }
        return false;
    }

    // Lấy user hiện tại
    public User getCurrentUser(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        return session != null ? (User) session.getAttribute("user") : null;
    }

    public boolean isAdmin(HttpServletRequest request) {
        return hasRole(request, ROLE_ADMIN);
    }

    public boolean isRegularUser(HttpServletRequest request) {
        return hasRole(request, ROLE_USER);
    }

    public ResponseEntity<Map<String, Object>> updatePassword(UpdatePasswordRequest request, HttpServletRequest httpRequest) {
        Map<String, Object> response = new HashMap<>();
        HttpSession session = httpRequest.getSession(false);

        if (session == null || session.getAttribute("user") == null) {
            response.put("success", false);
            response.put("message", "Unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        User user = (User) session.getAttribute("user");

        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            response.put("success", false);
            response.put("message", "Incorrect old password");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        response.put("success", true);
        response.put("message", "Password changed successfully");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    public ResponseEntity<String> updateProfile(UpdateProfileRequest request, HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        User user = (User) session.getAttribute("user");

        if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            if (!request.getPhone().matches("^\\d{10,11}$")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid phone number format");
            }
            user.setPhone(request.getPhone());
        }

        if (request.getName() != null && !request.getName().isEmpty()) {
            user.setName(request.getName());
        }

        userRepository.save(user);
        session.setAttribute("user", user);

        return ResponseEntity.status(HttpStatus.OK).body("Profile updated successfully")    ;
    }
    public void sendResetCode(String email) throws IOException {
        String code = generateVerificationCode();
        verificationCodes.put(email, code);
        emailService.sendResetCode(email, code);
    }

    private String generateVerificationCode() {
        int length = 6;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < length; i++) {
            code.append(characters.charAt(random.nextInt(characters.length())));
        }

        return code.toString();
    }

    public boolean verifyCode(String email, String inputCode) {
        String storedCode = verificationCodes.get(email);
        return storedCode != null && storedCode.equals(inputCode);
    }

    public void clearCode(String email) {
        verificationCodes.remove(email);
    }
}

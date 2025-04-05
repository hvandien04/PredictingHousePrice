package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.dtos.LoginRequest;
import com.example.PredictingHousePrice.dtos.RegisterRequest;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class AuthService {
    public final UserRepository userRepository;
    public final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
                System.out.println(user);
                return "login success";
            }
        }
        return "login failed";
    }

    public String register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        String password = request.getPassword();
        String regex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";  // Kiểm tra mật khẩu có ít nhất 8 ký tự, có chữ và số
        if (!Pattern.matches(regex, password)) {
            return "Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ và số.";
        }

        User user = new User();
        user.setUserID(generateRandomUserId());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setRole("0");
        user.setState("Active");

        user = userRepository.save(user);
        return "User registered successfully!";
    }

    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "Logged out successfully!";
    }
}

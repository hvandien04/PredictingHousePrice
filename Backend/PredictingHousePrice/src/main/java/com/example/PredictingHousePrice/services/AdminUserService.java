package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.dtos.UserCreateRequest;
import com.example.PredictingHousePrice.dtos.UserRequest;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.regex.Pattern;

@Service
public class AdminUserService {

    private final UserRepository userRepository;
    public final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public AdminUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserRequest mapToRequest(User user) {
        UserRequest res = new UserRequest();
        res.setUserID(user.getUserID());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setPhone(user.getPhone());
        res.setRole(user.getRole());
        res.setState(user.getState());
        return res;
    }

    public List<UserRequest> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToRequest)
                .collect(Collectors.toList());
    }

    private String generateRandomUserId() {
        String userId;
        do {
            userId = "U" + UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
        } while (userRepository.existsByUserID(userId));
        return userId;
    }
    public ResponseEntity<?> createUser(UserCreateRequest req) {
        // Kiểm tra email đã tồn tại
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email đã tồn tại");
        }

        // Kiểm tra mật khẩu hợp lệ (ít nhất 8 ký tự, bao gồm chữ và số)
        String password = req.getPassword();
        String regex = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$";
        if (!Pattern.matches(regex, password)) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Mật khẩu phải có ít nhất 8 ký tự và bao gồm cả chữ và số.");
        }

        // Tạo user mới
        User user = new User();
        user.setUserID(generateRandomUserId());
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setRole(req.getRole());
        user.setState(req.getState());

        // Lưu user vào database
        userRepository.save(user);

        // Trả về ResponseEntity với status CREATED và thông báo thành công
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Đăng ký thành công!");
    }



    public ResponseEntity<String> updateUserByAdmin(String userId, UserCreateRequest request) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User user = optionalUser.get();

        if (request.getName() != null && !request.getName().isEmpty()) {
            user.setName(request.getName());
        }

        if (request.getEmail() != null && !request.getEmail().isEmpty() && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Email đã tồn tại");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            user.setPassword(request.getPassword()); // Nếu cần mã hóa password thì mã hóa ở đây nhé
        }

        if (request.getPhone() != null && !request.getPhone().isEmpty()) {
            if (!request.getPhone().matches("^\\d{10,11}$")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid phone number format");
            }
            user.setPhone(request.getPhone());
        }

        if (request.getRole() != null && !request.getRole().isEmpty()) {
            user.setRole(request.getRole());
        }

        if (request.getState() != null && !request.getState().isEmpty()) {
            user.setState(request.getState());
        }

        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.OK).body("User updated successfully by admin");
    }
}

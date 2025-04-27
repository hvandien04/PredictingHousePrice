package com.example.PredictingHousePrice.services;

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
        user.setUserID(generateRandomUserId());
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
    public ResponseEntity<?> createUser(UserRequest req) {
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



    public ResponseEntity<?> updateUser(String id, UserRequest req) {
        Optional<User> existing = userRepository.findById(id);
        if (existing.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("User không tồn tại");
        }

        // Kiểm tra email đã tồn tại (trong trường hợp người dùng thay đổi email)
        if (userRepository.findByEmail(req.getEmail()).isPresent() &&
                !existing.get().getEmail().equals(req.getEmail())) {
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

        // Cập nhật thông tin user
        User user = existing.get();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setPhone(req.getPhone());
        user.setRole(req.getRole());
        user.setState(req.getState());

        // Lưu thay đổi vào database
        userRepository.save(user);

        // Trả về ResponseEntity với status OK và thông báo thành công
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Cập nhật người dùng thành công");
    }


    public boolean deleteUser(String id) {
        if (!userRepository.existsById(id)) return false;
        userRepository.deleteById(id);
        return true;
    }
}

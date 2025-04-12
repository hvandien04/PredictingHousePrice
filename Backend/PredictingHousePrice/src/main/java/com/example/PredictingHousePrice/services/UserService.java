package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.dtos.UserRequest;
import com.example.PredictingHousePrice.dtos.UserResponse;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserResponse mapToResponse(User user) {
        UserResponse res = new UserResponse();
        res.setUserID(user.getUserID());
        res.setName(user.getName());
        res.setEmail(user.getEmail());
        res.setPhone(user.getPhone());
        res.setRole(user.getRole());
        res.setState(user.getState());
        return res;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public UserResponse createUser(UserRequest req) {
        User user = new User();
        user.setUserID(req.getUserID());
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setPhone(req.getPhone());
        user.setRole(req.getRole());
        user.setState(req.getState());

        return mapToResponse(userRepository.save(user));
    }

    public UserResponse updateUser(String id, UserRequest req) {
        Optional<User> existing = userRepository.findById(id);
        if (existing.isEmpty()) return null;

        User user = existing.get();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());
        user.setPhone(req.getPhone());
        user.setRole(req.getRole());
        user.setState(req.getState());

        return mapToResponse(userRepository.save(user));
    }

    public boolean deleteUser(String id) {
        if (!userRepository.existsById(id)) return false;
        userRepository.deleteById(id);
        return true;
    }
}

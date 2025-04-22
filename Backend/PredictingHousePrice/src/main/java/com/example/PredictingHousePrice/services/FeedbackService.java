package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.entities.Feedback;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.FeedbackRepository;
import com.example.PredictingHousePrice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    }

    public Feedback getFeedbackById(String id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phản hồi với ID: " + id));
    }
    public Feedback createFeedback(String userId, String title, String message) {
        if (userId == null || userId.trim().isEmpty()) {
            throw new RuntimeException("User ID is required");
        }
        if (title == null || title.trim().isEmpty()) {
            throw new RuntimeException("Title is required");
        }
        if (message == null || message.trim().isEmpty()) {
            throw new RuntimeException("Message is required");
        }
        if (title.length() > 200) {
            throw new RuntimeException("Title must not exceed 200 characters");
        }
        if (message.length() > 200) {
            throw new RuntimeException("Message must not exceed 200 characters");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng với ID: " + userId));

        Feedback feedback = new Feedback();
        feedback.setFeedbackID(generateFeedbackId());
        feedback.setUserID(user);
        feedback.setTitle(title);
        feedback.setMessage(message);
        feedback.setDate(LocalDate.now());
        feedback.setStatus("pending");

        return feedbackRepository.save(feedback);
    }


    public void deleteFeedbackById(String id) {
        if (!feedbackRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy phản hồi với ID: " + id);
        }
        feedbackRepository.deleteById(id);
    }

    private String generateFeedbackId() {
        String feedbackId;
        do {
            feedbackId = "F" + UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
        } while (feedbackRepository.existsById(feedbackId));
        return feedbackId;
    }
}
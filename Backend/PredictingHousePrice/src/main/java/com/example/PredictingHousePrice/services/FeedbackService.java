package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.entities.Feedback;
import com.example.PredictingHousePrice.repositories.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    }

    public Feedback getFeedbackById(String id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phản hồi với ID: " + id));
    }

    public void deleteFeedbackById(String id) {
        feedbackRepository.deleteById(id);
    }
}

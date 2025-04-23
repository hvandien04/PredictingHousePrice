package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.dtos.SellinghouseRequest;
import com.example.PredictingHousePrice.dtos.UpdateStateRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.SellinghouseRepository;
import com.example.PredictingHousePrice.services.SellinghouseService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sellinghouses")
public class SellinghouseController {

    @Autowired
    private SellinghouseRepository repository;
    @Autowired
    private SellinghouseService sellinghouseService;

    @GetMapping
    public List<SellinghouseRequest> getAllSellinghouses() {
        return sellinghouseService.getAllHouses().stream()
                .map(SellinghouseRequest::new)
                .collect(Collectors.toList());
    }

    @GetMapping("/user")
    public List<Sellinghouse> getHistoryByUserId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            throw new IllegalStateException("User not logged in or session expired");
        }
        User user = (User) session.getAttribute("user");
        return repository.findByUserID(user);
    }

    @PutMapping("/update-state/{id}")
    public ResponseEntity<String> updateState(HttpServletRequest request ,@PathVariable("id") String id, @RequestBody UpdateStateRequest state) {
        return sellinghouseService.updateState(request,id, state);
    }
}

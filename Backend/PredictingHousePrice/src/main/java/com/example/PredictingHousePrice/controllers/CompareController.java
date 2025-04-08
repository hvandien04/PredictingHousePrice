package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.dtos.CompareRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.repositories.CompareRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/housescompare")
public class CompareController {

    @Autowired
    private CompareRepository repository;

    @GetMapping
    public List<CompareRequest> getAllHouses() {
        return repository.findAll().stream()
                .map(CompareRequest::new)
                .collect(Collectors.toList());
    }
}

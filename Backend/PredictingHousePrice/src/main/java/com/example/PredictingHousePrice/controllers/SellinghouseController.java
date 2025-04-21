package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.services.SellinghouseService;
import com.example.PredictingHousePrice.dtos.SellinghouseRequest;
import com.example.PredictingHousePrice.repositories.SellinghouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sellinghouses")
public class SellinghouseController {

    @Autowired
    private SellinghouseService sellinghouseService;
    
    // Trong SellinghouseController
    @GetMapping
    public List<SellinghouseRequest> getAllSellinghouses() {
        return sellinghouseService.getAllHouses().stream()
                .map(SellinghouseRequest::new)
                .collect(Collectors.toList());
    }


}

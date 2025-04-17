package com.example.PredictingHousePrice.controllers;

import com.example.PredictingHousePrice.dtos.UploadhouseRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.services.UploadhouseService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/uploadhouse")
public class UploadhouseController {

    @Autowired
    private UploadhouseService uploadhouseService;

    @PostMapping("/create")
    public Sellinghouse createUploadhouse(@RequestBody UploadhouseRequest uploadhouseRequest,
                                          HttpServletRequest request) {
        return uploadhouseService.uploadHouse(uploadhouseRequest, request);
    }
}

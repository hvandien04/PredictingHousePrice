package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.dtos.SellinghouseRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.repositories.SellinghouseRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellinghouseService {

    private final SellinghouseRepository sellinghouseRepository;

    public SellinghouseService(SellinghouseRepository sellinghouseRepository) {
        this.sellinghouseRepository = sellinghouseRepository;
    }

    public List<Sellinghouse> getAllHouses() {
        return sellinghouseRepository.findAll();
    }

    public Sellinghouse createHouse(SellinghouseRequest request) {
        Sellinghouse house = new Sellinghouse();
        house.setTitle(request.getTitle());
        house.setHouseType(request.getHouseType());
        house.setArea(request.getArea());
        house.setAddress(request.getAddress());
        house.setFloors(request.getFloors());
        house.setBedrooms(request.getBedrooms());
        house.setBathrooms(request.getBathrooms());
        house.setLegalStatus(request.getLegalStatus());
        house.setPrice(request.getPrice());
        house.setDescription(request.getDescription());
        house.setImage(request.getImage());
        house.setState(request.getState());

        return sellinghouseRepository.save(house);
    }

    public Sellinghouse updateHouse(String id, SellinghouseRequest request) {
        Optional<Sellinghouse> existingHouse = sellinghouseRepository.findById(id);
        if (existingHouse.isPresent()) {
            Sellinghouse house = existingHouse.get();
            house.setTitle(request.getTitle());
            house.setHouseType(request.getHouseType());
            house.setArea(request.getArea());
            house.setAddress(request.getAddress());
            house.setFloors(request.getFloors());
            house.setBedrooms(request.getBedrooms());
            house.setBathrooms(request.getBathrooms());
            house.setLegalStatus(request.getLegalStatus());
            house.setPrice(request.getPrice());
            house.setDescription(request.getDescription());
            house.setImage(request.getImage());
            house.setState(request.getState());
            return sellinghouseRepository.save(house);
        }
        return null;
    }

    public boolean deleteHouse(String id) {
        Optional<Sellinghouse> house = sellinghouseRepository.findById(id);
        if (house.isPresent()) {
            sellinghouseRepository.delete(house.get());
            return true;
        }
        return false;
    }
}

package com.example.PredictingHousePrice.services;

import com.example.PredictingHousePrice.dtos.SellinghouseRequest;
import com.example.PredictingHousePrice.dtos.UpdateStateRequest;
import com.example.PredictingHousePrice.entities.Sellinghouse;
import com.example.PredictingHousePrice.entities.User;
import com.example.PredictingHousePrice.repositories.SellinghouseRepository;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import com.example.PredictingHousePrice.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SellinghouseService {

    private final SellinghouseRepository sellinghouseRepository;
    private final UserRepository userRepository;

    public SellinghouseService(SellinghouseRepository sellinghouseRepository, UserRepository userRepository) {
        this.sellinghouseRepository = sellinghouseRepository;
        this.userRepository = userRepository;
    }

    public List<Sellinghouse> getAllHouses() {
        List<Sellinghouse> houses = sellinghouseRepository.findByStateContainingIgnoreCase("Đang bán");
        return houses;
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

        if (request.getUserID() != null) {
            Optional<User> user = userRepository.findById(request.getUserID());
            user.ifPresent(house::setUserID);
        }

        return sellinghouseRepository.save(house);
    }

    public List<Sellinghouse>  getHistoryByUserId(HttpServletRequest httpRequest) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            throw new IllegalStateException("User not logged in or session expired");
        }
        User user = (User) session.getAttribute("user");
        return sellinghouseRepository.findByUserID(user);

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

            if (request.getUserID() != null) {
                Optional<User> user = userRepository.findById(request.getUserID());
                user.ifPresent(house::setUserID);
            }

            return sellinghouseRepository.save(house);
        }
        return null;
    }

    public ResponseEntity<String> updateState(HttpServletRequest httpRequest, String id, UpdateStateRequest state) {
        HttpSession session = httpRequest.getSession(false);
        if (session == null || session.getAttribute("user") == null) {
            return new ResponseEntity<>("User not logged in or session expired", HttpStatus.UNAUTHORIZED);
        }

        User user = (User) session.getAttribute("user");
        Optional<Sellinghouse> existingHouse = sellinghouseRepository.findById(id);
        if (existingHouse.isEmpty()) {
            return new ResponseEntity<>("House not found", HttpStatus.NOT_FOUND);
        }

        Sellinghouse house = existingHouse.get();
        if (!house.getUserID().getUserID().equals(user.getUserID())) {
            return new ResponseEntity<>("User is not the owner of the house", HttpStatus.FORBIDDEN);
        }

        house.setState(state.getState());
        sellinghouseRepository.save(house);

        return new ResponseEntity<>("State updated successfully", HttpStatus.OK);
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

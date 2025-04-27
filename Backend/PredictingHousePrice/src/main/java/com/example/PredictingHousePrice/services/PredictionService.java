    package com.example.PredictingHousePrice.services;

    import com.example.PredictingHousePrice.entities.Predictedhouse;
    import com.example.PredictingHousePrice.entities.Prediction;
    import com.example.PredictingHousePrice.dtos.HousePredictionRequest;
    import com.example.PredictingHousePrice.entities.User;
    import com.example.PredictingHousePrice.repositories.PredictedhouseRepository;
    import com.example.PredictingHousePrice.repositories.PredictionRepository;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpSession;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Service;

    import java.time.LocalDate;
    import java.time.ZoneId;
    import java.time.ZonedDateTime;
    import java.util.ArrayList;
    import java.util.List;
    import java.util.UUID;

    @Service
    public class PredictionService {

        private final PredictionRepository predictionRepository;
        private final PredictedhouseRepository predictedhouseRepository;

        @Autowired
        public PredictionService(PredictionRepository predictionRepository, PredictedhouseRepository predictedhouseRepository) {
            this.predictionRepository = predictionRepository;
            this.predictedhouseRepository = predictedhouseRepository;
        }

        private String generateRandomPredictionID() {
            String predictionID;
            do {
                predictionID = "P" + UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
            } while (predictionRepository.existsByPredictionID(predictionID));
            return predictionID;
        }

        private String generateRandompHouseID() {
            String pHouseID;
            do {
                pHouseID = "pH" + UUID.randomUUID().toString().replace("-", "").substring(0, 5).toUpperCase();
            } while (predictedhouseRepository.existsBypHouseID(pHouseID));
            return pHouseID;
        }

        public Predictedhouse createHousePrediction(HousePredictionRequest request, HttpServletRequest httpRequest) {
            HttpSession session = httpRequest.getSession(false);
            if (session == null || session.getAttribute("user") == null) {
                throw new IllegalStateException("User not logged in or session expired");
            }

            User user = (User) session.getAttribute("user");

            ZonedDateTime vietnamTime = ZonedDateTime.now(ZoneId.of("Asia/Ho_Chi_Minh"));
            LocalDate currentDate = vietnamTime.toLocalDate();

            request.setDate(currentDate);

            Prediction prediction = new Prediction();
            prediction.setUserID(user);
            prediction.setPredictionID(generateRandomPredictionID());
            prediction.setDate(request.getDate());
            prediction.setPredictedPrice(request.getPredictedPrice());
            prediction.setConfidenceScore(request.getConfidenceScore());

            predictionRepository.save(prediction);

            Predictedhouse house = new Predictedhouse();
            house.setPHouseID(generateRandompHouseID());
            house.setPredictionID(prediction);
            house.setHouseType(request.getHouseType());
            house.setArea(request.getArea());
            house.setAddress(request.getAddress());
            house.setFloors(request.getFloors());
            house.setBedrooms(request.getBedrooms());

            return predictedhouseRepository.save(house);
        }

        public List<HousePredictionRequest> getHouseByUserID(HttpServletRequest httpRequest) {
            HttpSession session = httpRequest.getSession(false);
            if (session == null || session.getAttribute("user") == null) {
                throw new IllegalStateException("User not logged in or session expired");
            }
            User user = (User) session.getAttribute("user");
            List<Prediction> predictions = predictionRepository.findByUserID(user);
            List<HousePredictionRequest> results = new ArrayList<>();

            for (Prediction prediction : predictions) {
                Predictedhouse house = predictedhouseRepository.findByPredictionID(prediction);

                if (house != null) {
                    HousePredictionRequest dto = new HousePredictionRequest();
                    dto.setPredictionID(prediction.getPredictionID());
                    dto.setpHouseID(house.getPHouseID());
                    dto.setHouseType(house.getHouseType());
                    dto.setArea(house.getArea());
                    dto.setAddress(house.getAddress());
                    dto.setFloors(house.getFloors());
                    dto.setBedrooms(house.getBedrooms());
                    dto.setPredictedPrice(prediction.getPredictedPrice());
                    dto.setConfidenceScore(prediction.getConfidenceScore());
                    dto.setDate(prediction.getDate());

                    results.add(dto);
                }
            }

            return results;
        }
        public List<HousePredictionRequest> getTop4Houses() {
            List<Prediction> predictions = predictionRepository.findTop4ByOrderByDateDesc();
            List<HousePredictionRequest> results = new ArrayList<>();

            for (Prediction prediction : predictions) {
                Predictedhouse house = predictedhouseRepository.findByPredictionID(prediction);

                if (house != null) {
                    HousePredictionRequest dto = new HousePredictionRequest();
                    dto.setPredictionID(prediction.getPredictionID());
                    dto.setpHouseID(house.getPHouseID());
                    dto.setHouseType(house.getHouseType());
                    dto.setArea(house.getArea());
                    dto.setAddress(house.getAddress());
                    dto.setFloors(house.getFloors());
                    dto.setBedrooms(house.getBedrooms());
                    dto.setPredictedPrice(prediction.getPredictedPrice());
                    dto.setConfidenceScore(prediction.getConfidenceScore());
                    dto.setDate(prediction.getDate());

                    results.add(dto);
                }
            }

            return results;
        }
    }

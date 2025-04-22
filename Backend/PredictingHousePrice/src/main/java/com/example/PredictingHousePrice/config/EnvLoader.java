package com.example.PredictingHousePrice.config;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class EnvLoader {

    @PostConstruct
    public void loadEnv() {
        Dotenv dotenv = Dotenv.configure()
                .filename("sendgrid.env")
                .load();

        // Đưa vào biến môi trường JVM nếu cần (không bắt buộc nếu chỉ dùng dotenv.get)
        String sendgridApiKey = dotenv.get("SENDGRID_API_KEY");
        String fromEmail = dotenv.get("FROM_EMAIL");
        System.setProperty("SENDGRID_API_KEY", sendgridApiKey);
        System.setProperty("FROM_EMAIL", fromEmail);
    }
}

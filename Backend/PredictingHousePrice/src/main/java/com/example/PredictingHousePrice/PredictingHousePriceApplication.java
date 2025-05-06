package com.example.PredictingHousePrice;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PredictingHousePriceApplication {

	public static void main(String[] args) {


		Dotenv dotenv = Dotenv.configure()
				.filename(".env") // Tên file .env của bạn
				.load();

		System.setProperty("URL_DB", dotenv.get("URL"));
		System.setProperty("USERNAMEE", dotenv.get("USERNAMEE"));
		System.setProperty("PASSWORD", dotenv.get("PASSWORD"));
		System.setProperty("SENDGRID_API_KEY", dotenv.get("SENDGRID_API_KEY"));
		System.setProperty("FROM_EMAIL", dotenv.get("FROM_EMAIL"));

		SpringApplication.run(PredictingHousePriceApplication.class, args);
	}

}

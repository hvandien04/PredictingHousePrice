package com.example.PredictingHousePrice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileAccessConfig {

    @Bean
    public WebMvcConfigurer webMvcConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                // Cấu hình đường dẫn cho các tài nguyên trong thư mục uploads
                registry.addResourceHandler("/uploads/**")
                        .addResourceLocations("file:./uploads/");
            }
        };
    }
}

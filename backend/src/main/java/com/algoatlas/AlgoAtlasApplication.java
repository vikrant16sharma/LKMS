package com.algoatlas;

import com.algoatlas.config.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan(basePackageClasses = JwtProperties.class)
public class AlgoAtlasApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlgoAtlasApplication.class, args);
    }
}

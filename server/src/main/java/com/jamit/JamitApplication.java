package com.jamit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@SpringBootApplication
@EnableScheduling
public class JamitApplication extends SpringBootServletInitializer {

  public static void main(String[] args) {
        new SpringApplicationBuilder(JamitApplication.class)
            .properties(APPLICATION_LOCATIONS)
            .run(args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(JamitApplication.class);
    }

    public static final String APPLICATION_LOCATIONS = "spring.config.location="
        + "classpath:application.yml,"
        + "classpath:aws.yml";

}
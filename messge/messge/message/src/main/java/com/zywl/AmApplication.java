package com.zywl;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@MapperScan("com.zywl.mapper")
@EnableScheduling
public class AmApplication {

    public static void main(String[] args) {
        SpringApplication.run(AmApplication.class, args);
    }

}

package com.iu.gobike;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GoBikeApplication {

	public static void main(String[] args) {
		SpringApplication.run(GoBikeApplication.class, args);
	}

//	@Bean
//	public PasswordEncoder encoder() {
//		return new BCryptPasswordEncoder();
//	}

}

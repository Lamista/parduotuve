package com.laurastasiule;

import java.math.BigDecimal;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

import com.laurastasiule.Product.objects.ProductInfo;

@Configuration
@ImportResource({ "classpath*:application-context.xml" })
public class AppConfig {

	@Bean
	public ProductInfo getProduct1() {
		return new ProductInfo(1, "Samsung1", "/samsung.jpg", "desc", new BigDecimal(250), 1);
	}

	@Bean
	public ProductInfo getProduct2() {
		return new ProductInfo(2, "Samsung10", "/samsung.jpg", "desc", new BigDecimal(200), 2);
	}

	@Bean
	public ProductInfo getProduct3() {
		return new ProductInfo(3, "Samsung14", "/samsung.jpg", "desc", new BigDecimal(25), 6);
	}

	@Bean
	public ProductInfo getProduct4() {
		return new ProductInfo(4, "Samsung145", "/samsung.jpg", "desc", new BigDecimal(87), 99);
	}
}
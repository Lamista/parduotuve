package com.laurastasiule.Product.objects;

import java.math.BigDecimal;

public class ProductFromService {
	
	private long id;
	private String title;
	private String image;
	private String description;
	private BigDecimal price;
	private int quantity;

	public ProductFromService() {
	}

	public ProductFromService(long id, String title, String image, String description, BigDecimal price, int quantity) {
		this.id = id;
		this.title = title;
		this.image = image;
		this.description = description;
		this.price = price;
		this.quantity = quantity;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}

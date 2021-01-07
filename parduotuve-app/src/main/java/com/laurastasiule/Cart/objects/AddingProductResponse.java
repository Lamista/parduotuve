package com.laurastasiule.Cart.objects;

import java.util.List;

import com.laurastasiule.Product.objects.ProductFromService;

public class AddingProductResponse {
	private List<ProductFromService> products;
	private String message;
	private ProductFromService product;

	public AddingProductResponse() {
	}

	public AddingProductResponse(List<ProductFromService> products, String message, ProductFromService product) {
		this.products = products;
		this.message = message;
		this.product = product;
	}

	public List<ProductFromService> getCartSize() {
		return products;
	}

	public void setCartSize(List<ProductFromService> products) {
		this.products = products;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public ProductFromService getProduct() {
		return product;
	}

	public void setProduct(ProductFromService product) {
		this.product = product;
	}	



}

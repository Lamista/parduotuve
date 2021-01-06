package it.akademija.Cart;

import it.akademija.Product.objects.Product;

public class ProductCount {
	private Product product;
	private long count;

	public ProductCount() {
	}

	public ProductCount(Product product, long count) {
		this.product = product;
		this.count = count;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

}

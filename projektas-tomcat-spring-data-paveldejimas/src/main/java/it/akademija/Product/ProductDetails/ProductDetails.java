package it.akademija.Product.ProductDetails;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import it.akademija.Product.objects.Product;

@Entity
public class ProductDetails {
	@Id
	@Column
	private Long id;
	@Column
	private String image;
	@Column
	private String description;
	@OneToOne(mappedBy = "productDetails")
	private Product product;

	public ProductDetails() {
	}

	public ProductDetails(Long id,String image, String description) {
		this.id = id;
		this.image = image;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
}

package com.laurastasiule.Product.objects;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PositiveOrZero;

import com.laurastasiule.Cart.objects.Cart;
import com.laurastasiule.Product.ProductDetails.ProductDetails;

@Entity
@Table(name="PRODUCTS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type")
public abstract class Product {
	
	@Id
	private long id;
	
	@NotBlank(message="Cannot be empty")
	@Column(unique=true)
	private String title;
	@Column
	@PositiveOrZero(message="Cannot be negative")
	private BigDecimal price;
	@Column
	@PositiveOrZero(message="Cannot be negative")
	private int quantity;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "product_details_id")
	private ProductDetails productDetails;

	@ManyToMany(cascade= {CascadeType.MERGE, CascadeType.DETACH})
	@JoinTable(
			name = "P_C", 
			joinColumns = @JoinColumn(name = "P_ID"), 
			inverseJoinColumns = @JoinColumn(name = "C_ID")
			)
	private List<Cart> carts;
	
	public Product() {
	}
	
	public Product(long l, String title2, BigDecimal price2, int quantity2) {
		this.id = l;
		this.title = title2;
		this.price = price2;
		this.quantity = quantity2;
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

	public ProductDetails getProductDetails() {
		return productDetails;
	}

	public void setProductDetails(ProductDetails productDetails) {
		this.productDetails = productDetails;
	}

	public List<Cart> getCarts() {
		return carts;
	}

	public void setCarts(List<Cart> carts) {
		this.carts = carts;
	}

}

package com.laurastasiule.Cart.objects;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.laurastasiule.Product.objects.Product;

@Entity
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	@Column
	private String username;
	
	@ManyToMany(cascade= {CascadeType.MERGE, CascadeType.DETACH})
	@JoinTable(
			name = "P_C", 
			joinColumns = @JoinColumn(name = "C_ID"), 
			inverseJoinColumns = @JoinColumn(name = "P_ID")
			)
	private List<Product> products;
	
	public Cart() {
	}

	public Cart(String username) {
		this.username = username;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<Product> getProducts() {
		return products;
	}
	
	public void addProduct(Product product) {
		
		if (products == null) {
			products = new ArrayList<>();
		}
		
		products.add(product);
	}
	
	public void removeProduct(Product product) {		
		products.remove(product);
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}
	
}

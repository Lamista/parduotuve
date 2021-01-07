package com.laurastasiule.Product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laurastasiule.Product.ProductDetails.ProductDetails;
import com.laurastasiule.Product.objects.Clothes;
import com.laurastasiule.Product.objects.Product;
import com.laurastasiule.Product.objects.ProductFromService;
import com.laurastasiule.Product.objects.Toys;

@Service
public class ProductService {
	private static final Logger LOGGER = Logger.getLogger(ProductService.class.getName());
	
	@Autowired
	private ProductDao productDao;

	@Transactional(readOnly = true)
	public List<ProductFromService> getProducts() {
		return productDao.findAll()
				.stream()
				.map(p -> new ProductFromService(p.getId(), p.getTitle(), p.getProductDetails().getImage(), p.getProductDetails().getDescription(), p.getPrice(), p.getQuantity()))
				.collect(Collectors.toList());
	}

	@Transactional
	public void createProduct(ProductFromService productFromService) {
		long id = this.getProducts()
				.stream()
				.mapToLong(p -> p.getId())
				.max()
				.orElse(0) + 1;
		Product product = null;
		
		//create objects
		if (id%2==0) {
			product = new Clothes();
		} else {
			product = new Toys();
		}

		ProductDetails productDetails = new ProductDetails(id, productFromService.getImage(), productFromService.getDescription());
		
		product.setId(id);
		product.setTitle(productFromService.getTitle());
		product.setPrice(productFromService.getPrice());
		product.setQuantity(productFromService.getQuantity());
		
		//associate the objects //nebutina is abieju pusiu
		product.setProductDetails(productDetails);
		productDetails.setProduct(product);
		
		//save
//		System.out.println("Klase: " + product.getClass());
		productDao.save(product);
		
	}

	@Transactional(readOnly = true)
	public ProductFromService getProduct(long id) {
		Product product = productDao.findById(id).orElse(null);
		return new ProductFromService(product.getId(), product.getTitle(), product.getProductDetails().getImage(),
				product.getProductDetails().getDescription(), product.getPrice(), product.getQuantity());
	}

	@Transactional
	public void updateProduct(ProductFromService productFromService) {
		Product product = productDao.getOne(productFromService.getId());
		product.setTitle(productFromService.getTitle());
		product.getProductDetails().setImage(productFromService.getImage());
		product.getProductDetails().setDescription(productFromService.getDescription());
		product.setPrice(productFromService.getPrice());
		product.setQuantity(productFromService.getQuantity());
		productDao.save(product);
	}

	@Transactional
	public void deleteProduct(long id) {
		productDao.deleteById(id);		
	}

	public List<ProductFromService> getProductByName(String name) {
		String title = name.toLowerCase();
		return productDao.findAllByTitle(title)
				.stream()
				.map(p -> new ProductFromService(p.getId(), p.getTitle(), p.getProductDetails().getImage(), p.getProductDetails().getDescription(), p.getPrice(), p.getQuantity()))
				.collect(Collectors.toList());
	}

	public Map<String, Integer> getListOfTypes() {
		List<Product> products = productDao.findAll();

		Map<String, Integer> types = new HashMap<>();
		types.put("Toys", 0);
		types.put("Clothes", 0);
		
		for (Product p : products) {
			if (p instanceof Toys) {
				int value = types.get("Toys") + 1;
				types.put("Toys", value);
			} else {
				int value = types.get("Clothes") + 1;
				types.put("Clothes", value);
			}
		}
		return types;
	}

}

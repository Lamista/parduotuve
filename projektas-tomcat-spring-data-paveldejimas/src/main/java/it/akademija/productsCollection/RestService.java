package it.akademija.productsCollection;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.Product.objects.ProductInfo;

@RestController
public class RestService {
	@Autowired
	private List<ProductInfo> products;

	@RequestMapping("/productsCollection")
	public List<ProductInfo> getProductsCollection() {
		return products;
	}
}

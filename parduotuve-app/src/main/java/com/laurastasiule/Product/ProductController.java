package com.laurastasiule.Product;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.laurastasiule.Product.objects.ProductFromService;
import com.laurastasiule.Product.objects.ProductInfo;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "product")
@RequestMapping(value = "/api/products")
public class ProductController {
	@Autowired
	private ProductService productService;

	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get products", notes = "Returns all products")
	public List<ProductInfo> getProducts() {
		return productService.getProducts()
				.stream()
				.map(pfs -> new ProductInfo(pfs.getId(), pfs.getTitle(), pfs.getImage(), pfs.getDescription(), pfs.getPrice(), pfs.getQuantity()))
				.collect(Collectors.toList());
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create product", notes = "Creates product with data")
	public void createProduct(@RequestBody ProductInfo productInfo) {
		productService.createProduct(new ProductFromService(productInfo.getId(), productInfo.getTitle(), productInfo.getImage(), productInfo.getDescription(),
				productInfo.getPrice(), productInfo.getQuantity()));
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get product", notes = "Returns the product with given id")
	public ProductInfo getProduct(@PathVariable long id) {
		ProductFromService productFromService = productService.getProduct(id);
		return new ProductInfo (productFromService.getId(), productFromService.getTitle(), productFromService.getImage(), productFromService.getDescription(), productFromService.getPrice(), productFromService.getQuantity()); 
	}
	
	@RequestMapping(path = "/names/{name}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get product", notes = "Returns the product with given id")
	public List<ProductInfo> getProductByName(@PathVariable String name) {
		return productService.getProductByName(name)
				.stream()
				.map(pfs -> new ProductInfo(pfs.getId(), 
											pfs.getTitle(), 
											pfs.getImage(), 
											pfs.getDescription(), 
											pfs.getPrice(), 
											pfs.getQuantity()))
				.collect(Collectors.toList());
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.PUT)
	@ResponseStatus(HttpStatus.ACCEPTED)
	@ApiOperation(value = "Update product", notes = "Updates the product information")
	public void updateProduct(@RequestBody ProductInfo productInfo) {
		productService.updateProduct(new ProductFromService(productInfo.getId(), productInfo.getTitle(), productInfo.getImage(), productInfo.getDescription(),
				productInfo.getPrice(), productInfo.getQuantity()));
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete product", notes = "Deletes the product")
	public void deleteProduct(@PathVariable int id) {
		productService.deleteProduct(id);
	}

	@RequestMapping(path = "/types", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get product types", notes = "Returns types of products")
	public Map<String, Integer> getListOfTypes() {
		return productService.getListOfTypes();
	}
}

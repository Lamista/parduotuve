package com.laurastasiule.Cart;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.laurastasiule.Cart.objects.AddingProductResponse;
import com.laurastasiule.Product.objects.ProductFromService;
import com.laurastasiule.Product.objects.ProductInfo;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "cart-products")
@RequestMapping(value = "/api/users/{username}/cart-products")
public class CartController {
	@Autowired
	private CartService cartService;

	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get user cart", notes = "Returns all products in the user's cart")
	public List<ProductInfo> getProducts(@PathVariable String username) {
		return cartService.getCartProducts(username)
				.stream()
				.map(pfs -> new ProductInfo(pfs.getId(), pfs.getTitle(), pfs.getImage(), pfs.getDescription(), pfs.getPrice(), pfs.getQuantity()))
				.collect(Collectors.toList());

	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Add product", notes = "Add product to a user cart")
	public AddingProductResponse addProduct(@PathVariable String username,
			@RequestBody ProductInfo pi) {
		return cartService.addToCart(username, new ProductFromService(pi.getId(), pi.getTitle(), pi.getImage(), pi.getDescription(), pi.getPrice(), pi.getQuantity()));
	}

	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	@ApiOperation(value = "Delete product from a cart", notes = "Deletes the product from a user's cart")
	public List<ProductInfo> deleteProduct(@PathVariable String username,
			@PathVariable long id) {
		cartService.deleteProduct(username, id);
		return getProducts(username);
	}
	
	@RequestMapping(path = "/grouped",method = RequestMethod.GET)
	@ApiOperation(value = "Get user grouped cart products", notes = "Returns all products in the user's cart grouped by id")
	public List<GroupedCart> getGroupedCartProducts(@PathVariable String username) {
		return cartService.getGroupedCartProducts(username);
	}

//	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
//	@ResponseStatus(HttpStatus.NO_CONTENT)
//	@ApiOperation(value = "Delete product from a cart", notes = "Deletes the product from a user's cart")
//	public void deleteProduct(@PathVariable final String username, @PathVariable final int id) {
//		cartProductDao.deleteCartProduct(username, id);
//	}
}

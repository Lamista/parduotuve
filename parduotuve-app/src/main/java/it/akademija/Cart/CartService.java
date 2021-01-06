package it.akademija.Cart;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.akademija.Cart.objects.AddingProductResponse;
import it.akademija.Cart.objects.Cart;
import it.akademija.Product.ProductDao;
import it.akademija.Product.objects.Product;
import it.akademija.Product.objects.ProductFromService;

@Service
public class CartService {
	
	@Autowired
	private CartDao cartDao;
	@Autowired
	private ProductDao productDao;

	@Transactional
	public List<ProductFromService> getCartProducts(String username) {
		return cartDao.findCartByUsername(username).getProducts()
				.stream()
				.map(p -> new ProductFromService(p.getId(), p.getTitle(), p.getProductDetails().getImage(), p.getProductDetails().getDescription(), p.getPrice(), p.getQuantity()))
				.collect(Collectors.toList());
	}

	@Transactional
	public AddingProductResponse addToCart(String username, ProductFromService pfs) {
		String message = "Cannot add to cart. There's not enough product in stock.";
		Product product = productDao.getOne(pfs.getId());

		if (product.getQuantity()>0) {
			
			if (cartDao.findCartByUsername(username)==null) {
				cartDao.save(new Cart(username));
			}
			
			Cart cart = cartDao.findCartByUsername(username);
			cart.addProduct(product);
			product.setQuantity(product.getQuantity()-1);
			cartDao.save(cart);
			productDao.save(product);
			
			message = "Success";
		}
		
		return new AddingProductResponse(
				getCartProducts(username), 
				message, 
				new ProductFromService(
						product.getId(), 
						product.getTitle(), 
						product.getProductDetails().getImage(), 
						product.getProductDetails().getDescription(), 
						product.getPrice(), 
						product.getQuantity()
						)
				);
	
	}

	@Transactional
	public void deleteProduct(String username, long id) {
		//jei useris deletina preke, padidinti jos likuti vienu
		Product product = productDao.findById(id).orElse(null);
		Cart cart = cartDao.findCartByUsername(username);
		
		cart.removeProduct(product);
		product.setQuantity(product.getQuantity()+1);
		cartDao.save(cart);
		productDao.save(product);
	}

//	@Transactional
//	public GroupedCart getGroupedCartProducts(String username) {
//		String name = username.toLowerCase();
//		return cartDao.getGroupedCartInfo(name);
//	}

	@Transactional
	public List<GroupedCart> getGroupedCartProducts(String username) {
		return cartDao.getGroupedCartInfo(username);
	}
}

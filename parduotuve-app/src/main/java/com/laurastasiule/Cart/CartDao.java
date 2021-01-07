package com.laurastasiule.Cart;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.laurastasiule.Cart.objects.Cart;

public interface CartDao extends JpaRepository<Cart, Long> {

	Cart findCartByUsername(String username);

	@Query("SELECT new com.laurastasiule.Cart.GroupedCart(p.id as id, COUNT(p.id) as count) FROM Cart c join c.products p where c.id="
			+ "(SELECT c.id FROM Cart c WHERE c.username like :username) "
			+ "GROUP BY p.id")
	List<GroupedCart> getGroupedCartInfo(String username);
	
//	@Query("SELECT new com.laurastasiule.Cart.GroupedCart(p as product, a.count as count) from Product p join "
//			+ "(p.id as id, COUNT(p.id) as count FROM Cart c join c.products p where c.id="
//			+ "(SELECT c.id FROM Cart c WHERE c.username like :username) "
//			+ "GROUP BY p.id) as a "
//			+ "where p.id = a.id")
//	List<ProductCount> getGroupedCartInfo(String username);
}

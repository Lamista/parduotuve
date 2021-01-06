package it.akademija.Product;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import it.akademija.Product.objects.Product;

public interface ProductDao extends JpaRepository<Product, Long> {

	@Query("SELECT p FROM Product p WHERE LOWER(p.title) like %:title%")
	List<Product> findAllByTitle(String title);

}

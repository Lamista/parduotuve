package com.laurastasiule.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.laurastasiule.User.objects.User;

public interface UserDao extends JpaRepository<User, Long> {
	
	void deleteUserByUsername(String username);

	User findUserByUsername(String username);

	@Query("SELECT u FROM User u WHERE u.id = (SELECT MIN(u.id) FROM User u WHERE u.age = (SELECT MAX(u.age) FROM User u))")
	User findOldestUser();

//	default User findOldestUser() {
//		return findFirstByOrderByAgeDesc();
//	}
//
//	User findFirstByOrderByAgeDesc();

}

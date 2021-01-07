package com.laurastasiule.User;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.laurastasiule.User.objects.User;
import com.laurastasiule.User.objects.UserFromService;

@Service
public class UserService {
	@Autowired
	private UserDao userDao;

	@Transactional(readOnly = true)
	public List<UserFromService> getUsers() {
		return userDao.findAll().stream().map(user -> new UserFromService(user.getUsername(), user.getFirstName(),
				user.getLastName(), user.getEmail(), user.getAge())).collect(Collectors.toList());
	}

	@Transactional
	public void createUser(UserFromService userFromService) {
		if (userDao.findUserByUsername(userFromService.getUsername()) == null) {
			User newUser = new User(userFromService.getUsername(),
									userFromService.getFirstName(),
					    			userFromService.getLastName(),
					    			userFromService.getEmail(),
					    			userFromService.getAge()
					    			);
			userDao.save(newUser);
		}
	}

	@Transactional(readOnly = true)
	public UserFromService getUser(String username) {
		User user = userDao.findUserByUsername(username);
		return new UserFromService(
				user.getUsername(), 
				user.getFirstName(), 
				user.getLastName(), 
				user.getEmail(),
				user.getAge()
				);
	}

	@Transactional
	public void deleteUser(String username) {
		userDao.deleteUserByUsername(username);
	}

	@Transactional
	public UserFromService getOlgestUser() {
		User user = userDao.findOldestUser();
		return new UserFromService(user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(),
				user.getAge());
	}
}

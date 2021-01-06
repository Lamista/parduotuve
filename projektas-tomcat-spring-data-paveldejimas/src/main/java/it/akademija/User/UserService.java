package it.akademija.User;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.User.objects.Role;
import it.akademija.User.objects.User;
import it.akademija.User.objects.UserFromService;

@Service
public class UserService implements UserDetailsService {
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
			User newUser = new User();
			newUser.setUsername(userFromService.getUsername());
			PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
			newUser.setPassword(encoder.encode(userFromService.getPassword()));
			Role r = new Role();
			r.setName("CALC");
			newUser.setRole(r);
			User saved = userDao.save(newUser);
		}
	}

	@Transactional(readOnly = true)
	public UserFromService getUser(String username) {
		User user = userDao.findUserByUsername(username);
		return new UserFromService(user.getUsername(), user.getFirstName(), user.getLastName(), user.getEmail(),
				user.getAge());
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

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = findByUsername(username);
		if (user == null)
			throw new UsernameNotFoundException(username + " not found.");
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				AuthorityUtils.createAuthorityList(new String[] { "ROLE_" + user.getRole().getName() }));
	}

	private User findByUsername(String username) {
		return userDao.findUserByUsername(username);
	}
}

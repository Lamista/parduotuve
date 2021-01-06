package it.akademija.User;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.akademija.User.objects.UserFromService;
import it.akademija.User.objects.UserInfo;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {
	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	@ApiOperation(value = "Get users", notes = "Returns registered users")
	public List<UserInfo> getUsers() {
		return userService.getUsers()
				.stream()
				.map(ufs -> new UserInfo(ufs.getUsername(), ufs.getFirstName(),
				ufs.getLastName(), ufs.getEmail(), ufs.getAge()))
				.collect(Collectors.toList());
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseStatus(HttpStatus.CREATED)
	@ApiOperation(value = "Create user", notes = "Creates user with data")
	public void createUser(@ApiParam(value = "User Data", required = true) @Valid @RequestBody UserInfo userInfo) {
		userService.createUser(new UserFromService(userInfo.getUsername(), userInfo.getFirstName(),
				userInfo.getLastName(), userInfo.getEmail(), userInfo.getAge()));
	}

	@RequestMapping(path = "/{username}", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get user", notes = "Returns user by username")
	public UserInfo getUser(@PathVariable String username) {
		UserFromService userFromService = userService.getUser(username);
		return new UserInfo(userFromService.getUsername(), userFromService.getFirstName(),
				userFromService.getLastName(), userFromService.getEmail(), userFromService.getAge());
	}
	
	@RequestMapping(path = "/{username}", method = RequestMethod.DELETE)
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@ApiOperation(value = "Delete user", notes = "Deletes user by username")
	public void deleteUser(@PathVariable("username") String username) {
		userService.deleteUser(username);
	}

	@RequestMapping(path = "/oldest", method = RequestMethod.GET)
	@ResponseStatus(HttpStatus.OK)
	@ApiOperation(value = "Get oldest user", notes = "Returns oldest user")
	public UserInfo getOldestUser() {
		UserFromService userFromService = userService.getOlgestUser();
		return new UserInfo(userFromService.getUsername(), userFromService.getFirstName(),
				userFromService.getLastName(), userFromService.getEmail(), userFromService.getAge());
	}
}

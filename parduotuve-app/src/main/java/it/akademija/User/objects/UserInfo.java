package it.akademija.User.objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

public class UserInfo {

	@NotNull
	@Length(min = 3, max = 30)
	private String username;
	@NotBlank
	private String password;
//	@NotNull
//	@Length(min = 1, max = 100)
	private String firstName;
//	@NotNull
//	@Length(min = 1, max = 100)
	private String lastName;
//	@NotNull
//	@Length(min = 1, max = 200)
//	@Email
	private String email;
	private int age;

	public UserInfo() {
	}

	public UserInfo(@NotNull @Length(min = 1, max = 30) String username, String firstName, String lastName,
			String email, int age) {
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.age = age;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	
	
}

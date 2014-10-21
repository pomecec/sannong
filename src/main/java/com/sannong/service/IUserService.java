package com.sannong.service;

import java.util.List;

import com.sannong.infrastructure.persistance.entity.User;

public interface IUserService {
	
	List<User> getUserByUserId();
	
	boolean loginValidation(String phoneNumber, String password);
	
	boolean addUserInfo(User user);
}

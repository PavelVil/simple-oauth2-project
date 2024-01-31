package com.github.pavelvil.userapp.client;

import com.github.pavelvil.userapp.model.User;
import com.github.pavelvil.userapp.web.dto.CreateUserRequest;

import java.util.List;

public interface UserClient {

    User createUser(CreateUserRequest request);

    List<User> getUsers();

}

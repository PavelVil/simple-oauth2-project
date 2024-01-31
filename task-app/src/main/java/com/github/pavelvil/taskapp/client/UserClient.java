package com.github.pavelvil.taskapp.client;

import com.github.pavelvil.taskapp.web.dto.UserDto;

import java.util.List;

public interface UserClient {

    List<UserDto> getUsers();

}

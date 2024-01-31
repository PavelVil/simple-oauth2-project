package com.github.pavelvil.taskapp.service;

import com.github.pavelvil.taskapp.web.dto.UserDto;

import java.util.List;

public interface UserService {

    List<UserDto> getUsers();

}

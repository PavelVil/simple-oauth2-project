package com.github.pavelvil.userapp.web.controller;

import com.github.pavelvil.userapp.client.UserClient;
import com.github.pavelvil.userapp.model.User;
import com.github.pavelvil.userapp.web.dto.CreateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserClient userClient;

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<ResponseEntity<List<User>>> getUsers() {
        return Mono.just(ResponseEntity.ok(userClient.getUsers()));
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Mono<ResponseEntity<User>> createUser(@RequestBody CreateUserRequest request) {
        return Mono.just(ResponseEntity.status(HttpStatus.CREATED)
                .body(userClient.createUser(request)));
    }

}

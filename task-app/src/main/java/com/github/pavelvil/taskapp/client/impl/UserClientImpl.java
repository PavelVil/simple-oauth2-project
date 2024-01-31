package com.github.pavelvil.taskapp.client.impl;

import com.github.pavelvil.taskapp.client.KeycloakClient;
import com.github.pavelvil.taskapp.client.UserClient;
import com.github.pavelvil.taskapp.configuration.properties.ClientCredentialsProperties;
import com.github.pavelvil.taskapp.web.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserClientImpl implements UserClient {

    private final ClientCredentialsProperties clientCredentialsProperties;

    private final KeycloakClient keycloakClient;

    private final RestTemplate restTemplate;

    @Value("${app.integration.user-app.get-users-url}")
    private String usersUrl;

    @Override
    public List<UserDto> getUsers() {
        String token = keycloakClient.getToken(clientCredentialsProperties.getId(), clientCredentialsProperties.getSecret());
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        HttpEntity<?> request = new HttpEntity<>(headers);

        var response = restTemplate.exchange(
                usersUrl,
                HttpMethod.GET,
                request,
                new ParameterizedTypeReference<List<UserDto>>() {
                }
        );

        return response.getBody();
    }
}

package com.github.pavelvil.taskapp.client.impl;

import com.github.pavelvil.taskapp.client.KeycloakClient;
import com.github.pavelvil.taskapp.web.dto.TokeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class KeycloakClientImpl implements KeycloakClient {

    private static final String CLIENT_ID = "client_id";

    private static final String CLIENT_SECRET = "client_secret";

    private static final String GRANT_TYPE = "grant_type";

    private static final String CLIENT_CREDENTIALS = "client_credentials";

    @Value("${app.keycloak.token-url}")
    private String tokenUrl;

    private final RestTemplate restTemplate;

    @Override
    public String getToken(String clientId, String clientSecret) {
        MultiValueMap<String, String> requestParams = new LinkedMultiValueMap<>();
        requestParams.add(CLIENT_ID, clientId);
        requestParams.add(CLIENT_SECRET, clientSecret);
        requestParams.add(GRANT_TYPE, CLIENT_CREDENTIALS);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(requestParams, headers);

        var response = restTemplate.postForObject(tokenUrl, requestEntity, TokeResponse.class);

        return Objects.requireNonNull(response).getToken();
    }
}

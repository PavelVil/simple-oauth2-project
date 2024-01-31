package com.github.pavelvil.taskapp.client;

public interface KeycloakClient {

    String getToken(String clientId, String clientSecret);

}

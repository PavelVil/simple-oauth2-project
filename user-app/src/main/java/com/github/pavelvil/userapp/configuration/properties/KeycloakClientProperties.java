package com.github.pavelvil.userapp.configuration.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.keycloak.client")
@Getter
@Setter
public class KeycloakClientProperties {

    private String id;

    private String secret;

}

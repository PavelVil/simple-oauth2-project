package com.github.pavelvil.taskapp.configuration.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.keycloak.client")
@Getter
@Setter
public class ClientCredentialsProperties {

    private String id;

    private String secret;

}

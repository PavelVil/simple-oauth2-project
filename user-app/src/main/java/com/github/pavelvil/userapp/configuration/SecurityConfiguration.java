package com.github.pavelvil.userapp.configuration;

import com.github.pavelvil.userapp.security.JwtAuthConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http, JwtAuthConverter converter) {
        http.csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(ServerHttpSecurity.CorsSpec::disable)
                .authorizeExchange(it -> it.pathMatchers("/api/public/**").permitAll()
                        .anyExchange().authenticated())
                .oauth2ResourceServer(it -> it.jwt(jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(converter)));

        return http.build();
    }

}

package com.github.pavelvil.taskapp.configuration;

import com.github.pavelvil.taskapp.security.JwtAuthConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthConverter converter) throws Exception {
        http.csrf(CsrfConfigurer::disable)
                .cors(CorsConfigurer::disable)
                .authorizeHttpRequests(it -> it.requestMatchers("/public/**").permitAll()
                        .anyRequest().authenticated()
                ).sessionManagement(it -> it.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2ResourceServer(it -> it.jwt(jwtConfigurer -> jwtConfigurer.jwtAuthenticationConverter(converter)));

        return http.build();
    }

}

package com.github.pavelvil.taskapp.security;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {
    private static final String REALM_ACCESS = "realm_access";

    private static final String ROLES = "roles";

    @Override
    public AbstractAuthenticationToken convert(Jwt source) {
        return new JwtAuthenticationToken(
                source,
                extractResourceRoles(source).collect(Collectors.toSet()),
                getSubject(source)
        );
    }

    private String getSubject(Jwt jwt) {
        String claimName = JwtClaimNames.SUB;
        return jwt.getClaim(claimName);
    }

    private Stream<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
        Map<String, Object> realmAccess;
        Collection<String> resourceRoles;

        if (jwt.getClaim(REALM_ACCESS) == null) {
            return Stream.of();
        }

        realmAccess = jwt.getClaim(REALM_ACCESS);
        resourceRoles = (Collection<String>) realmAccess.get(ROLES);

        return resourceRoles
                .stream()
                .map(SimpleGrantedAuthority::new);
    }
}

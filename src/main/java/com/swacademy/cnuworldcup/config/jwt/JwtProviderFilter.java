package com.swacademy.cnuworldcup.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.swacademy.cnuworldcup.entity.Users;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.catalina.User;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;

public class JwtProviderFilter extends UsernamePasswordAuthenticationFilter {
    public JwtProviderFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            FilterChain chain, Authentication authResult) {
        try {
            Users user = (Users) authResult.getPrincipal();
            String username = user.getUsername();
            // secret, issuer 설정 필요
            Algorithm algorithm = Algorithm.HMAC256("secret");
            String token = JWT.create()
                    .withIssuer("issuer")
                    .withSubject(username)
                    .sign(algorithm);
            response.addHeader("Authorization", "Bearer " + token);
        } catch (JWTCreationException e) {
            e.printStackTrace();
        }
    }

}

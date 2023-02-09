package com.swacademy.cnuworldcup.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.swacademy.cnuworldcup.config.auth.UserDetailsServiceImpl;
import com.swacademy.cnuworldcup.entity.Users;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtValidationFilter extends OncePerRequestFilter {
    private final UserDetailsServiceImpl userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if(header != null && header.startsWith("Bearer ")) {
            try {
                String accessToken = header.substring(7);
                // secret, issuer 설정 필요
                Algorithm algorithm = Algorithm.HMAC256("secret");
                JWTVerifier verifier = JWT.require(algorithm).withIssuer("issuer").build();
                DecodedJWT jwt = verifier.verify(accessToken);
                String username = jwt.getSubject();

                Users user = (Users) userDetailsService.loadUserByUsername(username);
                Authentication authenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            } catch (JWTVerificationException e) {
                e.printStackTrace();
            }
        }
        filterChain.doFilter(request, response);
    }
}

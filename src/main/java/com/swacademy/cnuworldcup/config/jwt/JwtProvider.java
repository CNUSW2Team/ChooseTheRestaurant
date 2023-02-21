package com.swacademy.cnuworldcup.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProvider {

    private String secret;
    private String issuer;

    public String createToken(String username) {
        Algorithm algorithm = Algorithm.HMAC256(this.getSecret());
        String token = JWT.create()
                .withIssuer(this.getIssuer())
                .withSubject(username)
                .sign(algorithm);
        return token;
    }

}

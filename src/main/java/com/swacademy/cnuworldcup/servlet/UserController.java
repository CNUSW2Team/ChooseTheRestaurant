package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.entity.Users;
import com.swacademy.cnuworldcup.entity.status.Role;
import com.swacademy.cnuworldcup.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @GetMapping("/signUp")
    public String signUp() {
        Users user = Users.builder()
                .userId(UUID.randomUUID())
                .username("test")
                .password(passwordEncoder.encode("test123"))
                .role(Role.ROLE_USER)
                .build();

        userService.saveUser(user);

        return "Success singUp!";
    }

    @PostMapping("/auth/login")
    public String login(@RequestBody Users user) {
        String token = userService.createJwt(user.getUsername(), user.getPassword());
        return token;
    }

}

package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.entity.Users;
import com.swacademy.cnuworldcup.entity.status.Role;
import com.swacademy.cnuworldcup.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/auth/findUser")
    public boolean findUserByUsername(@RequestParam String username) {
        log.info(username);
        return userService.findByUsername(username).isPresent();
    }

    @PostMapping("/auth/signUp")
    public String singUp(@RequestBody Users user) {
        return userService.saveUser(user.getUsername(), user.getPassword());
    }

    @PostMapping("/auth/signIn")
    public String singIn(@RequestBody Users user) {
        String token = userService.createJwt(user.getUsername(), user.getPassword());
        return token;
    }

}

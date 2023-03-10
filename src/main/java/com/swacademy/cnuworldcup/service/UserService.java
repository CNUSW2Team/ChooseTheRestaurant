package com.swacademy.cnuworldcup.service;

import com.swacademy.cnuworldcup.config.jwt.JwtProvider;
import com.swacademy.cnuworldcup.entity.Users;
import com.swacademy.cnuworldcup.entity.status.Role;
import com.swacademy.cnuworldcup.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    public Optional<Users> findByUsername(String username) {return userRepository.findByUsername(username);}

    public void saveUser(Users user) {userRepository.save(user);}

    public String saveUser(String username, String password) {

        Users user = Users.builder()
                .userId(UUID.randomUUID())
                .username(username)
                .password(passwordEncoder.encode(password))
                .role(Role.ROLE_USER)
                .build();

        this.saveUser(user);
        return "회원가입 완료";
    }

    public String createJwt(String username, String password) {
        Optional<Users> user = this.findByUsername(username);
        if(user.isEmpty()) throw new UsernameNotFoundException(username);
        if(!passwordEncoder.matches(password, user.get().getPassword()))
            throw new RuntimeException("Invalid password : " + password);

        return jwtProvider.createToken(user.get().getUsername());
    }
}

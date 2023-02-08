package com.swacademy.cnuworldcup.service;

import com.swacademy.cnuworldcup.entity.Users;
import com.swacademy.cnuworldcup.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<Users> findByUserName(String name) {return userRepository.findByName(name);}

    public void saveUser(Users user) {userRepository.save(user);
    }
}

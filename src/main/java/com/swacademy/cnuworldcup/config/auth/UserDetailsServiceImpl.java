package com.swacademy.cnuworldcup.config.auth;

import com.swacademy.cnuworldcup.entity.Users;
import com.swacademy.cnuworldcup.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Users> user = userService.findByUsername(username);
        if(user.isEmpty()) throw new UsernameNotFoundException(username);
        return user.get();
    }

}

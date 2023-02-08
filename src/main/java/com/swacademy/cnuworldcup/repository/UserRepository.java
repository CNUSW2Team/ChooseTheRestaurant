package com.swacademy.cnuworldcup.repository;

import com.swacademy.cnuworldcup.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<Users, UUID> {
    Optional<Users> findByName(String name);
}

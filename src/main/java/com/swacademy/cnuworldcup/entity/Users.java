package com.swacademy.cnuworldcup.entity;

import com.swacademy.cnuworldcup.entity.status.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Users {
    @Id
    private UUID userId;

    private String name;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
}

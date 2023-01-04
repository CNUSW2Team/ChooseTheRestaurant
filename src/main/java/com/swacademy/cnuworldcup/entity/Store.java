package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Store {
    @Id
    private UUID store_id;

    @Column(length = 20, nullable = true, unique = false)
    private String store_name;

    @Column(length = 20, nullable = true, unique = false)
    private String address;

    @Column(length = 20, nullable = true, unique = false)
    private String phone_number;

    @Column(length = 20, nullable = true, unique = false)
    private String opening_hours;

    @Column(length = 20, nullable = true, unique = false)
    private String image;

}

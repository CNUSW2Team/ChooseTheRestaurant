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

    private String store_name;

    private String address;

    private String phone_number;

    private String opening_hours;
    
    private String image;

}

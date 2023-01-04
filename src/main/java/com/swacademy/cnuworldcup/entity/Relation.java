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
public class Relation {
    @Id
    private UUID relation_id;

    @Column(length = 20, nullable = false, unique = false)
    private UUID worldcup_id;

    @Column(length = 20, nullable = false, unique = false)
    private UUID store_id;

    @Column(length = 20, nullable = false, unique = false)
    private int win_count;
}

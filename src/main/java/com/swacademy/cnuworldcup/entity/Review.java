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
public class Review {
    @Id
    private UUID review_id;

    @Column(length = 20, nullable = false, unique = false)
    private UUID store_id;

    @Column(length = 20, nullable = false, unique = false)
    private String writer;

    @Column(length = 20, nullable = false, unique = false)
    private String contents;

    @Column(length = 20, nullable = false, unique = false)
    private int rating;

    @Column(length = 20, nullable = false, unique = false)
    private String date;

}

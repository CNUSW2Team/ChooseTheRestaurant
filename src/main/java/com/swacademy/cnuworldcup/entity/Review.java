package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
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

    private UUID store_id;

    private String writer;

    private String contents;

    private int rating;

    @CreationTimestamp
    private Timestamp date;

}

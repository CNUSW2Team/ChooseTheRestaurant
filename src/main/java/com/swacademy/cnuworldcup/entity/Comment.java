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
public class Comment {
    @Id
    private UUID comment_id;

    @Column(length = 20, nullable = false, unique = false)
    private UUID store_id;

    @Column(length = 20, nullable = false, unique = false)
    private String contents;

}

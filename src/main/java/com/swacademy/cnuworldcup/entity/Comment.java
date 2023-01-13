package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "store")
public class Comment {
    @Id
    private UUID comment_id;

    //private UUID store_id;

    private String contents;

    @ManyToOne
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

}

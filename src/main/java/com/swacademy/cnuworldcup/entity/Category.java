package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "relations")
public class Category {
    @Id
    private UUID category_id;

    private String category_name;

    private int like_num;

    @CreationTimestamp
    private Timestamp created_at;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    private List<Relation> relations = new ArrayList<>();
}

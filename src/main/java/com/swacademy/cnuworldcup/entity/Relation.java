package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
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

    private UUID worldcup_id;

    private UUID store_id;

    private int win_count;

    @OneToMany(mappedBy = "relation")
    private List<Store> relations = new ArrayList<>();

}

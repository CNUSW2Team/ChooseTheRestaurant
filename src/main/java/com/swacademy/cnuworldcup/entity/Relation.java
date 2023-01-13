package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static jakarta.persistence.GenerationType.IDENTITY;

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

    @ManyToOne
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    @ManyToOne
    @JoinColumn(name = "worldcup_id", referencedColumnName = "worldcup_id")
    private WorldCup worldCup;

    private int win_count;
}

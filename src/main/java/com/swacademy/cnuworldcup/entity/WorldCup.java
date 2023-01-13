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
@ToString(exclude = "relations")
@Table(name = "worldcup")
public class WorldCup {
    @Id
    private UUID worldcup_id;

    private String worldcup_name;

    private int like_num;

    @OneToMany(mappedBy = "worldCup", fetch = FetchType.EAGER)
    private List<Relation> relations = new ArrayList<>();
}

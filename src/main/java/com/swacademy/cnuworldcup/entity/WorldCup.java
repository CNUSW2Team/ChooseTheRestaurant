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
@ToString(exclude = "stores")
@Table(name = "worldcup")
public class WorldCup {
    @Id
    private UUID worldcup_id;

    private String worldcup_name;

    private int like_num;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "relation", joinColumns = @JoinColumn(name = "worldcup_id"),
            inverseJoinColumns = @JoinColumn(name = "store_id"))
    private List<Store> stores = new ArrayList<>();
}

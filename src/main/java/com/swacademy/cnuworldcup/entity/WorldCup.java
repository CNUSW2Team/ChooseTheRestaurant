package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "worldcup")
public class WorldCup {
    @Id
    private UUID worldcup_id;

    private String worldcup_name;

    private int like_num;

}

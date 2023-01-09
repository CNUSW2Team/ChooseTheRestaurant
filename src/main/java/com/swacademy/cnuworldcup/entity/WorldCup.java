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
public class WorldCup {
    @Id
    private UUID worldcup_id;

    private String store_name;

    private int like_num;

    private String image;

}

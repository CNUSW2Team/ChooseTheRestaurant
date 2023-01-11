package com.swacademy.cnuworldcup.entity.joinEntity;

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
public class RankingResult {
    @Id
    private UUID store_id;

    private String store_name;

    private int winning_Count;

    private float stars;

}

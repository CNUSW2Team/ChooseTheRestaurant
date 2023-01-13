package com.swacademy.cnuworldcup.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RelationDto {
    private UUID relation_id;

    private StoreDto storeDto;

    private CategoryDto categoryDto;

    private int win_count;
}

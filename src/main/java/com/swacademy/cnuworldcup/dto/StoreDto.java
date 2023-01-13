package com.swacademy.cnuworldcup.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class StoreDto {
    @Id
    private UUID store_id;

    private String store_name;

    private String address;

    private String phone_number;

    private String opening_hours;

    private List<RelationDto> relations;

    private List<MenuDto> menus;

    private List<ReviewDto> reviews;

    private List<CommentDto> comments;
}

package com.swacademy.cnuworldcup.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommentDto {
    private UUID comment_id;

    private StoreDto storeDto;

    private String contents;
}

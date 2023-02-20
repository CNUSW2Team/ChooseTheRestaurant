package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "menu")
public class HashTag {
    @Id
    private long tag_id;

    @ManyToOne
    @JoinColumn(name = "menu_id", referencedColumnName = "menu_id")
    private Menu menu;

    private String tag_name;
}

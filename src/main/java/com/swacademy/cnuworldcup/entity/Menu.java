package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "store")
public class Menu {
    @Id
    private UUID menu_id;

    @ManyToOne
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    private String menu_name;

    private int price;

}

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
@ToString(exclude = {"worldCups", "menus", "reviews", "relations"})
public class Store {
    @Id
    private UUID store_id;

    private String store_name;

    private String address;

    private String phone_number;

    private String opening_hours;

    @OneToMany(mappedBy = "store", fetch = FetchType.EAGER)
    private List<Relation> relations = new ArrayList<>();

    @OneToMany(mappedBy = "store", fetch = FetchType.EAGER)
    private List<Menu> menus = new ArrayList<>();

    @OneToMany(mappedBy = "store", fetch = FetchType.EAGER)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "store", fetch = FetchType.EAGER)
    private List<Comment> comments = new ArrayList<>();
}

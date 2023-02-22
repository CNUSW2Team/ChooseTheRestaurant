package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Tag {
    @Id
    private long tag_id;

    @Column(name = "tag_name")
    private String name;

    @OneToMany(mappedBy = "tag", fetch = FetchType.EAGER)
    private List<MenuTag> menuTag = new ArrayList<>();
}

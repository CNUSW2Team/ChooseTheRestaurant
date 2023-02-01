package com.swacademy.cnuworldcup.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = "store")
public class Review implements Comparable<Review>{
    @Id
    private UUID review_id;

    @ManyToOne
    @JoinColumn(name = "store_id", referencedColumnName = "store_id")
    private Store store;

    private String writer;

    private String contents;

    private float rating;

    private String password;

    @CreationTimestamp
    private Timestamp date;


    @Override
    public int compareTo(Review o) {
        if(date.before(o.date)){
            return 1;
        }
        else if(date.after(o.date)){
            return -1;
        }
        return 0;
    }
}

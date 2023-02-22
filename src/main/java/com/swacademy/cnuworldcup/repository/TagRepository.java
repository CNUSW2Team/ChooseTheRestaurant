package com.swacademy.cnuworldcup.repository;

import com.swacademy.cnuworldcup.entity.Review;
import com.swacademy.cnuworldcup.entity.Store;
import com.swacademy.cnuworldcup.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}

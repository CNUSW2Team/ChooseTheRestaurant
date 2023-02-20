package com.swacademy.cnuworldcup.repository;

import com.swacademy.cnuworldcup.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MenuTagRepository extends JpaRepository<MenuTag, UUID> {
    List<MenuTag> findByMenu(Menu menu);
    List<MenuTag> findByTag(Tag tag);
}

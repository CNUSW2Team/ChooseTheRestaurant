package com.swacademy.cnuworldcup.repository;

import com.swacademy.cnuworldcup.entity.Relation;
import com.swacademy.cnuworldcup.entity.Category;
import com.swacademy.cnuworldcup.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RelationRepository extends JpaRepository<Relation, UUID> {
    List<Relation> findByCategory(Category category);
    List<Relation> findByStore(Store store);
}

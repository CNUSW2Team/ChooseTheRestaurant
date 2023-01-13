package com.swacademy.cnuworldcup.repository;

import com.swacademy.cnuworldcup.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RelationRepository extends JpaRepository<Relation, UUID> {
}

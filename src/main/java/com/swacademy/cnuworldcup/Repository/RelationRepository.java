package com.swacademy.cnuworldcup.Repository;

import com.swacademy.cnuworldcup.entity.Comment;
import com.swacademy.cnuworldcup.entity.Relation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RelationRepository extends JpaRepository<Relation, UUID> {
}

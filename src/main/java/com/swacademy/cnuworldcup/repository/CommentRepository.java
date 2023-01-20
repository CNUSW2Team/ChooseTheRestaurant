package com.swacademy.cnuworldcup.repository;

import com.swacademy.cnuworldcup.entity.Category;
import com.swacademy.cnuworldcup.entity.Comment;
import com.swacademy.cnuworldcup.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByStore(Store store);
}

package com.swacademy.cnuworldcup.repository;

import com.swacademy.cnuworldcup.entity.Comment;
import com.swacademy.cnuworldcup.entity.Review;
import com.swacademy.cnuworldcup.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, UUID> {
    List<Review> findByStore(Store store);
}

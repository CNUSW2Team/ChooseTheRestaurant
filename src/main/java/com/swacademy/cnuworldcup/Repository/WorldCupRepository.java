package com.swacademy.cnuworldcup.Repository;

import com.swacademy.cnuworldcup.entity.WorldCup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WorldCupRepository extends JpaRepository<WorldCup, UUID> {
}

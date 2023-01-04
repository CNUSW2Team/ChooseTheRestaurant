package com.swacademy.cnuworldcup.Repository;

import com.swacademy.cnuworldcup.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StoreRepository extends JpaRepository<Store, UUID> {
}

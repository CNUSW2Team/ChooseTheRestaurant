package com.swacademy.cnuworldcup;

import com.swacademy.cnuworldcup.Repository.RelationRepository;
import com.swacademy.cnuworldcup.Repository.ReviewRepository;
import com.swacademy.cnuworldcup.Repository.StoreRepository;
import com.swacademy.cnuworldcup.Repository.WorldCupRepository;
import com.swacademy.cnuworldcup.entity.Relation;
import com.swacademy.cnuworldcup.entity.Review;
import com.swacademy.cnuworldcup.entity.Store;
import com.swacademy.cnuworldcup.entity.WorldCup;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Slf4j
public class tester {

    public static void main(String[] args) {
        var applicationContext = new AnnotationConfigApplicationContext(AppConfiguration.class);
        var repository = applicationContext.getBean(RelationRepository.class);
        UUID rand = UUID.randomUUID();
        Relation obj = Relation.builder()
                .relation_id(rand)
                .worldcup_id(UUID.fromString("0b44cd73-6ab8-4500-9d07-fbc9cdfa03bd"))
                .store_id(UUID.fromString("3ee3785d-afe3-46f5-999e-ae77a0dc8d06"))
                .win_count(50)
                .build();
        //storeRepository.deleteAll();
        repository.save(obj);
    }
}

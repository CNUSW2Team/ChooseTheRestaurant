package com.swacademy.cnuworldcup;

import com.swacademy.cnuworldcup.Repository.StoreRepository;
import com.swacademy.cnuworldcup.Repository.WorldCupRepository;
import com.swacademy.cnuworldcup.entity.Store;
import com.swacademy.cnuworldcup.entity.WorldCup;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.UUID;

@Slf4j
public class tester {

    public static void main(String[] args) {
        var applicationContext = new AnnotationConfigApplicationContext(AppConfiguration.class);
        var storeRepository = applicationContext.getBean(WorldCupRepository.class);
        UUID rand = UUID.randomUUID();
        WorldCup worldCup = WorldCup.builder()
                .worldcup_id(UUID.randomUUID())
                .worldcup_name("분위기 좋은 맛집")
                .like_num(50)
                .build();
        //storeRepository.deleteAll();
        storeRepository.save(worldCup);
    }
}

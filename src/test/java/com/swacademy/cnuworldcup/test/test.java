package com.swacademy.cnuworldcup.test;


import com.swacademy.cnuworldcup.entity.Menu;
import com.swacademy.cnuworldcup.entity.Store;
import com.swacademy.cnuworldcup.entity.WorldCup;
import com.swacademy.cnuworldcup.repository.MenuRepository;
import com.swacademy.cnuworldcup.repository.StoreRepository;
import com.swacademy.cnuworldcup.repository.WorldCupRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.PropertySource;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@SpringBootTest
public class test {

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    WorldCupRepository worldCupRepository;

    @Test
    void menu_insert_test() {
        Store store = storeRepository.findById(UUID.fromString("0c8eeaaa-eee8-4318-989b-c765aa691a9a")).get();
        Menu menu = new Menu();
        menu.setMenu_id(UUID.randomUUID());
        menu.setPrice(9000);
        menu.setStore(store);
        menu.setMenu_name("치즈돈까스");

        Menu saved = menuRepository.save(menu);

        log.info("{}", saved);

    }

    @Test
    void store_menu_test() {
        Store store = storeRepository.findById(UUID.fromString("0c8eeaaa-eee8-4318-989b-c765aa691a9a")).get();
        store.getMenus().forEach(System.out::println);
    }
}

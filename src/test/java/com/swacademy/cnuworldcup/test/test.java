package com.swacademy.cnuworldcup.test;


import com.swacademy.cnuworldcup.entity.Menu;
import com.swacademy.cnuworldcup.entity.Relation;
import com.swacademy.cnuworldcup.entity.Store;
import com.swacademy.cnuworldcup.entity.Category;
import com.swacademy.cnuworldcup.repository.MenuRepository;
import com.swacademy.cnuworldcup.repository.RelationRepository;
import com.swacademy.cnuworldcup.repository.StoreRepository;
import com.swacademy.cnuworldcup.repository.CategoryRepository;
import com.swacademy.cnuworldcup.service.CRUDService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.UUID;

@Slf4j
@SpringBootTest
public class test {

    @Autowired
    StoreRepository storeRepository;

    @Autowired
    MenuRepository menuRepository;

    @Autowired
    CategoryRepository worldCupRepository;

    @Autowired
    RelationRepository relationRepository;

    @Autowired
    CRUDService crudService;


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

    @Test
    void category_store_insert_test() {
        Category worldCup = worldCupRepository.findAll().get(0);
        worldCup.getRelations().forEach(v -> System.out.println(v.getStore().getStore_id()));

    }

    @Test
    void category_wincount_test() {
        Category worldCup = worldCupRepository.findAll().get(2);
        relationRepository.findByCategory(worldCup).forEach(v -> System.out.println(v.getWin_count()));
    }

    @Test
    void category_save_test() {
        Category worldCup1 = Category.builder().category_id(UUID.randomUUID())
                .category_name("테스트 월드컵")
                .like_num(0)
                .build();
        worldCupRepository.save(worldCup1);
    }



    @Test
    void relation_save_test() {

        Category worldCup = worldCupRepository.findAll().get(0);
        Store store = storeRepository.findAll().get(0);
        Relation relation = Relation.builder()
                .relation_id(UUID.randomUUID())
                .category(worldCup)
                .win_count(0)
                .store(store)
                .build();

        log.info("{}", relation.getRelation_id());

        relationRepository.save(relation);
    }

    @Test
    void asdf(){
        crudService.saveComment(UUID.fromString("0c8eeaaa-eee8-4318-989b-c765aa691a9a"), "꿀맛이에요");

    }

    @Test
    void sdfdsf(){
        String s = "안녕하세요";
        log.info("charAt(0): {}", s.charAt(1));

    }

//    @Test
//    void find_store_dto_test() throws NotFoundException {
//
//        StoreDto storeById = crudService.findStoreById(UUID.fromString("0c8eeaaa-eee8-4318-989b-c765aa691a9a"));
////        Store byId = storeRepository.findById(UUID.fromString("0c8eeaaa-eee8-4318-989b-c765aa691a9a")).get();
////        System.out.println(byId);
//
//
//    }
}

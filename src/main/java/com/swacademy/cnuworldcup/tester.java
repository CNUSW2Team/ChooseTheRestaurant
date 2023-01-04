package com.swacademy.cnuworldcup;

import com.swacademy.cnuworldcup.Repository.StoreRepository;
import com.swacademy.cnuworldcup.entity.Store;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.UUID;

@Slf4j
public class tester {

    public static void main(String[] args) {
        var applicationContext = new AnnotationConfigApplicationContext(AppConfiguration.class);
        var storeRepository = applicationContext.getBean(StoreRepository.class);
        Store store = Store.builder().store_id(UUID.randomUUID()).build();
        storeRepository.deleteAll();
        storeRepository.save(store);

        List<Store> storeList = storeRepository.findAll();

        Store st = storeList.get(0);
        log.info("Store name: {}", st.getStore_name());
    }
}

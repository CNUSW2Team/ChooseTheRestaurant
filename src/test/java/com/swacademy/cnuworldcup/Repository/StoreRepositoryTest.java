package com.swacademy.cnuworldcup.Repository;

import com.swacademy.cnuworldcup.entity.Store;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
class StoreRepositoryTest {
    private static final Logger logger = LoggerFactory.getLogger(StoreRepositoryTest.class);

    @Autowired
    private StoreRepository storeRepository;

    @Test
    public void testStoreRepository() {
        logger.info("test");
        Store store = Store.builder().store_name("테스트").build();
        storeRepository.save(store);

        List<Store> storeList = storeRepository.findAll();

        Store st = storeList.get(0);
        logger.info("test: {}", st.getStore_name());
    }

}
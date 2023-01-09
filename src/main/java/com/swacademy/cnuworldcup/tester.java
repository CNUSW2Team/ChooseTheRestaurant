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
        UUID rand = UUID.randomUUID();
        Store store = Store.builder()
                .store_id(UUID.randomUUID())
                .store_name("청춘우동")
                .address("대전광역시 유성구 궁동 410")
                .phone_number("042-823-7234")
                .opening_hours("금요일\t오전 11:00~오후 8:30\n" +
                        "토요일\t오전 11:00~오후 8:30\n" +
                        "일요일\t오전 11:00~오후 8:30\n" +
                        "월요일\t오전 11:00~오후 8:30\n" +
                        "화요일\t오전 11:00~오후 8:30\n" +
                        "수요일\t오전 11:00~오후 8:30\n" +
                        "목요일\t오전 11:00~오후 8:30")
                .image("/resources/static/images/store_" + rand.toString() + ".jpg")
                .build();
        //storeRepository.deleteAll();
        storeRepository.save(store);
    }
}

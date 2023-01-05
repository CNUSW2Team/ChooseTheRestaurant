package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.Repository.StoreRepository;
import com.swacademy.cnuworldcup.entity.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StoreController {

    @Autowired
    private final StoreRepository storeRepository;

    public StoreController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @GetMapping("/store/list")
    public List<Store> allStores(){
        return storeRepository.findAll();
    }
}

package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.Repository.*;
import com.swacademy.cnuworldcup.entity.Store;
import com.swacademy.cnuworldcup.entity.WorldCup;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class Controller {

    @Autowired
    private final StoreRepository storeRepository;
    @Autowired
    private final WorldCupRepository worldCupRepository;
    @Autowired
    private final ReviewRepository reviewRepository;
    @Autowired
    private final RelationRepository relationRepository;
    @Autowired
    private final MenuRepository menuRepository;
    @Autowired
    private final CommentRepository commentRepository;

    @GetMapping("/store/all")
    public List<Store> allStores(){
        return storeRepository.findAll();
    }

    @GetMapping(value = "/store/{storeId}")
    public Optional<Store> storeInfo(@PathVariable("storeId") String storeId) {
        return storeRepository.findById(UUID.fromString(storeId));
    }

    @GetMapping(value = "/category/all")
    public List<WorldCup> allCategories(){
        return worldCupRepository.findAll();
    }

    @GetMapping(value = "/category/{categoryId}")
    public Optional<WorldCup> categoryInfo(@PathVariable("categoryId") String categoryId) {
        return worldCupRepository.findById(UUID.fromString(categoryId));
    }
}

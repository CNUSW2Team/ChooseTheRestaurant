package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.repository.*;
import com.swacademy.cnuworldcup.entity.Relation;
import com.swacademy.cnuworldcup.entity.Review;
import com.swacademy.cnuworldcup.entity.Store;
import com.swacademy.cnuworldcup.entity.Category;
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
    private final CategoryRepository worldCupRepository;
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
    public List<Category> allCategories(){
        return worldCupRepository.findAll();
    }

    @GetMapping(value = "/category/{categoryId}")
    public Optional<Category> categoryInfo(@PathVariable("categoryId") String categoryId) {
        return worldCupRepository.findById(UUID.fromString(categoryId));
    }

    @GetMapping(value = "/review/all")
    public List<Review> allReviews(){
        return reviewRepository.findAll();
    }

    @GetMapping(value = "/review/{reviewId}")
    public Optional<Review> reviewInfo(@PathVariable("reviewId") String reviewId) {
        return reviewRepository.findById(UUID.fromString(reviewId));
    }

    @GetMapping(value = "/relation")
    public List<Relation> allRelations(){
        return relationRepository.findAll();
    }

//    @GetMapping(value = "/ranking/{categoryId}")
//    public Optional<Review> rankingResult(@PathVariable("categoryId") String categoryId) {
//
//
//
//
//
//        return reviewRepository.findById(UUID.fromString(reviewId));
//    }
}

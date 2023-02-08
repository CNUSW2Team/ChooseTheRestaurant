package com.swacademy.cnuworldcup.service;
import com.swacademy.cnuworldcup.entity.*;
import com.swacademy.cnuworldcup.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CRUDService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private MenuRepository menuRepository;
    @Autowired
    private RelationRepository relationRepository;
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private StoreRepository storeRepository;

    @Transactional
    public List<Store> findAllStores() {
        return storeRepository.findAll();
    }

    @Transactional
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Store findStoreById(UUID uuid) {
        return storeRepository.findById(uuid).get();
    }

    @Transactional
    public Category findCategoryById(UUID uuid) {
        return categoryRepository.findById(uuid).get();
    }

    @Transactional
    public Menu findMenuById(UUID uuid) {
        return menuRepository.findById(uuid).get();
    }

    @Transactional
    public Comment findCommentById(UUID uuid) {
        return commentRepository.findById(uuid).get();
    }

    @Transactional
    public Review findReviewById(UUID uuid) {
        return reviewRepository.findById(uuid).get();
    }

    @Transactional
    public List<Relation> findRelationsByCategoryId(UUID uuid) {
        Category category = categoryRepository.findById(uuid).get();
        return relationRepository.findByCategory(category);
    }

    @Transactional
    public List<Relation> findRelationsByStoreId(UUID uuid) {
        Store store = storeRepository.findById(uuid).get();
        return relationRepository.findByStore(store);
    }

    @Transactional
    public List<Comment> findCommentByStoreId(UUID uuid) {
        Store store = storeRepository.findById(uuid).get();
        return commentRepository.findByStore(store);
    }

    @Transactional
    public List<Menu> findMenuByStoreId(UUID uuid) {
        Store store = storeRepository.findById(uuid).get();
        return menuRepository.findByStore(store);
    }

    @Transactional
    public List<Review> findReviewByStoreId(UUID uuid) {
        Store store = storeRepository.findById(uuid).get();
        return reviewRepository.findByStore(store);
    }

    @Transactional
    public Comment saveComment(UUID storeUUID, String s) {
        Store store = storeRepository.findById(storeUUID).get();
        Comment comment = new Comment();
        comment.setComment_id(UUID.randomUUID());
        comment.setStore(store);
        comment.setContents(s);
        return commentRepository.save(comment);
    }

    @Transactional
    public Store saveStore(Store store) {
        return storeRepository.save(store);
    }

    @Transactional
    public Menu saveMenu(Menu menu) {
        return menuRepository.save(menu);
    }
    @Transactional
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Transactional
    public Relation saveRelation(Relation relation) {
        return relationRepository.save(relation);
    }

    @Transactional
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Transactional
    public void removeCategory(Category category) {
        categoryRepository.delete(category);
    }

    @Transactional
    public void removeRelation(Relation relation) {
        relationRepository.delete(relation);
    }

    @Transactional
    public void removeMenu(Menu menu) {
        menuRepository.delete(menu);
    }

    @Transactional
    public void removeComment(Comment comment) {
        commentRepository.delete(comment);
    }

    @Transactional
    public void removeReview(Review review) {
        reviewRepository.delete(review);
    }

    @Transactional
    public void removeStore(Store store) {
        storeRepository.delete(store);
    }
}

package com.swacademy.cnuworldcup.service;
import com.swacademy.cnuworldcup.entity.Category;
import com.swacademy.cnuworldcup.entity.Comment;
import com.swacademy.cnuworldcup.entity.Store;
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
    @Autowired

    @Transactional
    public List<Store> findAllStores() {
        return storeRepository.findAll();
    }

    @Transactional
    public Store findStoreById(UUID uuid) {
        return storeRepository.findById(uuid).get();
    }

    @Transactional
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Category findCategoryById(UUID uuid) {
        return categoryRepository.findById(uuid).get();
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
}

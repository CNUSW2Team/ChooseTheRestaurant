package com.swacademy.cnuworldcup.converter;

import com.swacademy.cnuworldcup.dto.*;
import com.swacademy.cnuworldcup.entity.*;
import org.springframework.stereotype.Component;

@Component
public class Converter {
    //store
    public Store convertStore(StoreDto storeDto) {
        Store store = new Store();
        store.setStore_id(storeDto.getStore_id());
        store.setStore_name(storeDto.getStore_name());
        store.setAddress(storeDto.getAddress());
        store.setPhone_number(storeDto.getPhone_number());
        store.setOpening_hours(storeDto.getOpening_hours());
        store.setRelations(storeDto.getRelations().stream().map(this::convertRelation).toList());
        store.setMenus(storeDto.getMenus().stream().map(this::convertMenu).toList());
        store.setComments(storeDto.getComments().stream().map(this::convertComment).toList());
        store.setReviews(storeDto.getReviews().stream().map(this::convertReview).toList());
        return store;
    }

    public StoreDto convertStoreDto(Store store) {
        return StoreDto.builder()
                .store_id(store.getStore_id())
                .store_name(store.getStore_name())
                .address(store.getAddress())
                .phone_number(store.getPhone_number())
                .opening_hours(store.getOpening_hours())
                .relations(store.getRelations().stream().map(this::convertRelationDto).toList())
                .menus(store.getMenus().stream().map(this::convertMenuDto).toList())
                .comments(store.getComments().stream().map(this::convertCommentDto).toList())
                .reviews(store.getReviews().stream().map(this::convertReviewDto).toList())
                .build();
    }

    //category
    public Category convertCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setCategory_id(categoryDto.getCategory_id());
        category.setCategory_name(categoryDto.getCategory_name());
        category.setRelations(categoryDto.getRelations().stream().map(this::convertRelation).toList());
        category.setLike_num(category.getLike_num());
        return category;
    }

    public CategoryDto convertCategoryDto(Category category) {
        return CategoryDto.builder()
                .category_id(category.getCategory_id())
                .category_name(category.getCategory_name())
                .like_num(category.getLike_num())
                .relations(category.getRelations().stream().map(this::convertRelationDto).toList())
                .build();
    }

    //relation
    public Relation convertRelation(RelationDto relationDto) {
        Relation relation = new Relation();
        relation.setRelation_id(relationDto.getRelation_id());
        relation.setWin_count(relationDto.getWin_count());
        relation.setStore(this.convertStore(relationDto.getStoreDto()));
        relation.setCategory(this.convertCategory(relationDto.getCategoryDto()));
        return relation;
    }

    public RelationDto convertRelationDto(Relation relation) {
        return RelationDto.builder()
                .relation_id(relation.getRelation_id())
                .categoryDto(convertCategoryDto(relation.getCategory()))
                .storeDto(convertStoreDto(relation.getStore()))
                .win_count(relation.getWin_count())
                .build();
    }

    //comment
    public Comment convertComment(CommentDto commentDto) {
        Comment comment = new Comment();
        comment.setComment_id(commentDto.getComment_id());
        comment.setContents(commentDto.getContents());
        comment.setStore(convertStore(commentDto.getStoreDto()));
        return comment;
    }

    public CommentDto convertCommentDto(Comment comment) {
        return CommentDto.builder()
                .comment_id(comment.getComment_id())
                .contents(comment.getContents())
                .storeDto(convertStoreDto(comment.getStore()))
                .build();
    }

    //menu
    public Menu convertMenu(MenuDto menuDto) {
        Menu menu = new Menu();
        menu.setMenu_name(menuDto.getMenu_name());
        menu.setMenu_id(menuDto.getMenu_id());
        menu.setPrice(menuDto.getPrice());
        menu.setStore(convertStore(menuDto.getStoreDto()));
        return menu;
    }

    public MenuDto convertMenuDto(Menu menu) {
        return MenuDto.builder()
                .menu_id(menu.getMenu_id())
                .menu_name(menu.getMenu_name())
                .price(menu.getPrice())
                .storeDto(convertStoreDto(menu.getStore()))
                .build();
    }

    //reivew
    public Review convertReview(ReviewDto reviewDto) {
        Review review = new Review();
        review.setReview_id(reviewDto.getReview_id());
        review.setStore(convertStore(reviewDto.getStore()));
        review.setContents(reviewDto.getContents());
        review.setDate(reviewDto.getDate());
        review.setWriter(reviewDto.getWriter());
        review.setRating(reviewDto.getRating());
        return review;
    }

    public ReviewDto convertReviewDto(Review review) {
        return ReviewDto.builder()
                .review_id(review.getReview_id())
                .date(review.getDate())
                .store(convertStoreDto(review.getStore()))
                .contents(review.getContents())
                .writer(review.getWriter())
                .rating(review.getRating())
                .build();
    }
}

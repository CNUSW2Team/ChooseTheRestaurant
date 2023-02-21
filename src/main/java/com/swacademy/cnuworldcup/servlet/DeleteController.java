package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.entity.*;
import com.swacademy.cnuworldcup.service.CRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.List;
import java.util.UUID;

import static com.swacademy.cnuworldcup.util.Util.deleteImage;

@Slf4j
@RestController
@AllArgsConstructor
public class DeleteController {
    @Autowired
    CRUDService crudService;

    //    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\frontend\\public\\img").getAbsolutePath();
    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\resources\\image\\").getAbsolutePath();

    @DeleteMapping(value = "/api/Store/{storeId}")
    public String removeStore(@PathVariable String storeId) {
        Store removeStore = crudService.findStoreById(UUID.fromString(storeId));

        // Store와 연관된 모든 Relation 삭제
        for (Relation relation : crudService.findRelationsByStoreId(UUID.fromString(storeId))) {
            crudService.removeRelation(relation);
        }
        // Store와 연관된 모든 Menu 삭제
        for (Menu menu : crudService.findMenuByStoreId(UUID.fromString(storeId))) {
            crudService.removeMenu(menu);
        }
        // Store와 연관된 모든 Comment 삭제
        for (Comment comment : crudService.findCommentByStoreId(UUID.fromString(storeId))) {
            crudService.removeComment(comment);
        }
        // Store와 연관된 모든 Reply 삭제
        for (Review review : crudService.findReviewByStoreId(UUID.fromString(storeId))) {
            crudService.removeReview(review);
        }

        crudService.removeStore(removeStore);

        // 사진 삭제
        deleteImage(IMAGE_FILE_UPLOAD_PATH, storeId);
        return "가게 삭제 완료";
    }

    @DeleteMapping(value = "/api/Category/{categoryId}")
    public String removeCategory(@PathVariable String categoryId) {
        Category removeCategory = crudService.findCategoryById(UUID.fromString(categoryId));

        List<Relation> relations = crudService.findRelationsByCategoryId(UUID.fromString(categoryId));
        for (Relation r : relations) {
            crudService.removeRelation(r);
        }
        crudService.removeCategory(removeCategory);

        // 사진 삭제
        deleteImage(IMAGE_FILE_UPLOAD_PATH, categoryId);

        return "카테고리 삭제 완료";
    }

    @DeleteMapping(value = "/api/Menu/{menuId}")
    public String removeMenu(@PathVariable String menuId) {
        Menu toRemove = crudService.findMenuById(UUID.fromString(menuId));
        crudService.removeMenu(toRemove);
        deleteImage(IMAGE_FILE_UPLOAD_PATH, menuId);

        return "선택한 메뉴 삭제 완료";
    }

    @DeleteMapping(value = "/api/Comment/{commentId}")
    public String removeComment(@PathVariable String commentId) {
        Comment removeComment = crudService.findCommentById(UUID.fromString(commentId));
        crudService.removeComment(removeComment);
        return "코멘트 삭제 완료";
    }

    @DeleteMapping(value = "/api/Review/{reviewId}")
    public String removeReview(@PathVariable String reviewId) {
        Review removeReview = crudService.findReviewById(UUID.fromString(reviewId));
        crudService.removeReview(removeReview);
        return "리뷰 삭제 완료";
    }
}

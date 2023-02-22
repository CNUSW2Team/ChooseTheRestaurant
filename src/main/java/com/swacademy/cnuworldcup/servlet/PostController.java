package com.swacademy.cnuworldcup.servlet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swacademy.cnuworldcup.entity.*;
import com.swacademy.cnuworldcup.service.CRUDService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;

import static com.swacademy.cnuworldcup.util.Util.*;


@Slf4j
@RestController
@AllArgsConstructor
public class PostController {
    @Autowired
    CRUDService crudService;

//    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\frontend\\public\\img").getAbsolutePath();
    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\resources\\image\\").getAbsolutePath();

    @PostMapping(value = "/api/admin/Store")
    public String AddNewStore(String storeDto, MultipartFile[] files) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> storeMap = mapper.readValue(storeDto, Map.class);

        UUID storeID = UUID.randomUUID();
        Store store = Store.builder().store_id(storeID).address(storeMap.get("address")).opening_hours(storeMap.get("opening_hours")).store_name(storeMap.get("store_name")).phone_number(storeMap.get("phone_number")).build();
        crudService.saveStore(store);

        File fileSave = new File(IMAGE_FILE_UPLOAD_PATH, storeID.toString() + ".jpg");
        files[0].transferTo(fileSave);
        saveFormattedImage(IMAGE_FILE_UPLOAD_PATH, storeID.toString(), 1000, 1000);

        return "새로운 가게 등록 완료";
    }

    @PostMapping(value = "/api/Review")
    public String AddNewReview(String reviewDto) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> reviewMap = mapper.readValue(reviewDto, Map.class);

        UUID reviewId = UUID.randomUUID();

        Store store = crudService.findStoreById(UUID.fromString(reviewMap.get("store_id")));

        Review review = Review.builder()
                .review_id(reviewId)
                .writer(reviewMap.get("writer"))
                .rating(Float.parseFloat(reviewMap.get("rating")))
                .store(store)
                .contents(reviewMap.get("contents"))
                .password(reviewMap.get("password"))
                .date(new Timestamp(System.currentTimeMillis()))
                .build();
        crudService.saveReview(review);

        return "리뷰 등록 완료";
    }

    @PostMapping(value = "/api/Tag")
    public void AddNewTag(String tag) {
        Tag newTag = Tag.builder().name(tag).build();
        crudService.saveTag(newTag);
    }

    @PostMapping(value = "/api/Category")
    public String AddNewCategory(String categoryDto) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> categoryMap = mapper.readValue(categoryDto, Map.class);

        ArrayList<String> storeList = (ArrayList<String>) categoryMap.get("stores");

        if (storeList.size() < 2) {
            return "가게를 2개 이상 등록해야 합니다.";
        }

        UUID categoryId = UUID.randomUUID();
        Category category = Category.builder()
                .category_id(categoryId)
                .category_name((String) categoryMap.get("category_name"))
                .like_num(0)
                .created_at(new Timestamp(System.currentTimeMillis()))
                .build();
        crudService.saveCategory(category);

        for (String storeId : storeList) {
            Store store = crudService.findStoreById(UUID.fromString(storeId));
            Relation relation = Relation.builder().relation_id(UUID.randomUUID()).win_count(0).store(store).category(category).build();
            crudService.saveRelation(relation);
        }

        Collections.shuffle(storeList);

        combineAndSaveImage(IMAGE_FILE_UPLOAD_PATH, storeList.get(0), storeList.get(1), categoryId.toString());

        return "새로운 카테고리 등록 완료";
    }

//    @PostMapping(value = "/api/admin/Menu")
//    public String AddNewMenu(String menuDto, MultipartFile[] file) throws IOException {
//
//        ObjectMapper mapper = new ObjectMapper();
//        Map<String, String> menuMap = mapper.readValue(menuDto, Map.class);
//
//        UUID menuID = UUID.randomUUID();
//        Menu menu = Menu.builder()
//                .menu_id((menuID))
//                .menu_name(menuMap.get("menu_name"))
//                .price(Integer.parseInt(menuMap.get("price")))
//                .store(crudService.findStoreById(UUID.fromString(menuMap.get("store_id"))))
//                .build();
//        crudService.saveMenu(menu);
//
//        if(file != null) {
//            File fileSave = new File(IMAGE_FILE_UPLOAD_PATH, menuID.toString() + ".jpg");
//            file[0].transferTo(fileSave);
//            saveFormattedImage(IMAGE_FILE_UPLOAD_PATH, menuID.toString(), 1000, 1000);
//        }
//
//        return "새로운 메뉴 등록 완료";
//    }

    @PostMapping(value = "/api/winCount/{categoryId}/{storeId}")
    public String winnerCountIncrease(@PathVariable("categoryId") String categoryId, @PathVariable("storeId") String storeId) {
        Relation relations = crudService.findCategoryById(UUID.fromString(categoryId)).getRelations().stream().filter(v -> v.getStore().getStore_id().toString().equals(storeId)).findFirst().get();
        int winCount = relations.getWin_count();
        relations.setWin_count(winCount+1);

        crudService.saveRelation(relations);
        return "승리 처리 완료.";
    }

    @PostMapping(value = "/api/Comment/{storeId}")
    public String createComment(@PathVariable("storeId") String storeId, String comments) {

        Comment comment = Comment.builder().comment_id(UUID.randomUUID()).store(crudService.findStoreById(UUID.fromString(storeId))).contents(comments).build();

        crudService.saveComment(comment);
        return "코멘트 등록 완료.";
    }
}

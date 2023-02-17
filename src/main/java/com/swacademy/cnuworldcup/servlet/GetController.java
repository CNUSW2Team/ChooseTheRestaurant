package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.entity.*;
import com.swacademy.cnuworldcup.service.CRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@RestController
@AllArgsConstructor
public class GetController {
    @Autowired
    CRUDService crudService;

//    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\frontend\\public\\img").getAbsolutePath();
    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\resources\\image\\").getAbsolutePath();

    @GetMapping("/image/{image_id}")
    public @ResponseBody ResponseEntity<Resource> getImageWithMediaType(@PathVariable("image_id") String image_id) throws IOException {
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        File file = new File(IMAGE_FILE_UPLOAD_PATH, image_id + ".jpg");
        if(!file.exists()){
            file = new File(IMAGE_FILE_UPLOAD_PATH, "default-image.jpg");
        }
        Resource resource = new FileSystemResource(file);

        return new ResponseEntity<Resource>(resource, headers, HttpStatus.CREATED);
    }

    // 인기순으로 정렬
    @GetMapping("/api/Category")
    public @ResponseBody String getAllCategory() {
        List<JSONObject> results = new ArrayList<>();
        List<Category> categories = crudService.findAllCategories();
        categories.sort((a, b) -> b.getLike_num() - a.getLike_num());

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        for (Category category : categories) {
            JSONObject json = new JSONObject();
            String time = simpleDateFormat.format(category.getCreated_at());
            json.put("category_id", category.getCategory_id());
            json.put("category_name", category.getCategory_name());
            json.put("favorite", category.getLike_num());
            json.put("num_of_stores", (long) category.getRelations().size());
            json.put("created_at", time);
            results.add(json);
        }
        return results.toString();
    }

    @GetMapping("/api/Category/{categoryId}")
    public @ResponseBody String getOneCategory(@PathVariable("categoryId") String categoryId) {
        JSONObject results = new JSONObject();
        Category category = crudService.findCategoryById(UUID.fromString(categoryId));
        results.put("category_id", category.getCategory_id());
        results.put("category_name", category.getCategory_name());
        results.put("favorite", category.getLike_num());

        return results.toString();
    }

    @GetMapping("/api/Ranking/{categoryId}") //categoryId에 해당하는 가게들의 리스트 반환(랭킹결과 가게순위 확인시)
    public @ResponseBody String getStoreOfCategory(@PathVariable("categoryId") String categoryId) {
        List<JSONObject> results = new ArrayList<>();
        Category category = crudService.findCategoryById(UUID.fromString(categoryId));
        category.getRelations().stream().sorted(((a, b) -> b.getWin_count() - a.getWin_count())).forEach((v) -> {
            JSONObject json = new JSONObject();
            json.put("store_id", v.getStore().getStore_id());
            json.put("store_name", v.getStore().getStore_name());
            double averageStars = v.getStore().getReviews().stream().mapToDouble(Review::getRating).average().orElse(0);
            json.put("stars", averageStars);
            json.put("winningCount", v.getWin_count());

            results.add(json);
        });

        return results.toString();
    }

    @GetMapping("/api/Store") // DB에 존재하는 모든 가게들을 반환(월드컵 제작용)
    public @ResponseBody String getAllStore() {
        List<JSONObject> results = new ArrayList<>();
        List<Store> allStores = crudService.findAllStores();

        for (Store store : allStores) {
            JSONObject json = new JSONObject();
            json.put("store_id", store.getStore_id());
            json.put("store_name", store.getStore_name());
            json.put("address", store.getAddress());
            json.put("numOfReviews", store.getReviews().size());
            json.put("averageStars", Math.round(store.getReviews().stream().mapToDouble(Review::getRating).average().orElseGet(()-> 0)*100.0)/100.0);

            results.add(json);
        }

        return results.toString();
    }

    @GetMapping("/api/Round/{categoryId}/{numOfRound}") // categoryId에 해당하는 numOfRound개의 가게리스트 반환(월드컵에 필요한 가게들을 얻을때)
    public @ResponseBody String getRoundStore(@PathVariable("categoryId") String categoryId, @PathVariable("numOfRound") int numOfRound) {
        List<JSONObject> results = new ArrayList<>();
        List<Relation> relations = crudService.findCategoryById(UUID.fromString(categoryId)).getRelations();
        Collections.shuffle(relations);

        relations.stream().limit(numOfRound).forEach(v -> {
            JSONObject json = new JSONObject();
            Store store = v.getStore();
            json.put("store_id", store.getStore_id());
            json.put("store_name", store.getStore_name());

            results.add(json);
        });
        return results.toString();
    }

    @GetMapping("/api/Ranking/{categoryId}/{storeId}") // categoryId에 해당하는 storeId의 랭킹정보 반환(내가 선택한 1위 가게의 정보 출력시)
    public @ResponseBody String getWinnerResult(@PathVariable("categoryId") String categoryId, @PathVariable("storeId") String storeId) {
        JSONObject results = new JSONObject();
        List<Relation> relations = crudService.findCategoryById(UUID.fromString(categoryId)).getRelations().stream().sorted((a, b) -> b.getWin_count() - a.getWin_count()).toList();

        Store store = crudService.findStoreById(UUID.fromString(storeId));
        double averageStars = store.getReviews().stream().mapToDouble(Review::getRating).average().orElse(0);
        Relation rank = store.getRelations().stream().filter(v -> Objects.equals(v.getCategory().getCategory_id().toString(), categoryId)).findFirst().get();

        results.put("store_name", store.getStore_name());
        results.put("rank", relations.indexOf(rank) + 1);
        results.put("stars", averageStars);

        return results.toString();
    }

    @GetMapping("/api/Comment/{storeId}") // storeId의 코멘트를 반환
    public @ResponseBody String getComments(String categoryId, @PathVariable("storeId") String storeId) {
        List<JSONObject> results = new ArrayList<>();
        List<Comment> comments = crudService.findCommentByStoreId(UUID.fromString(storeId));

        for (Comment comment : comments) {
            JSONObject json = new JSONObject();
            json.put("comment_id", comment.getComment_id());
            json.put("comment", comment.getContents());
            results.add(json);
        }

        return results.toString();
    }

    @GetMapping("/api/Store/{storeId}") // storeId에 해당하는 store의 상세정보
    public @ResponseBody String getStoreInfo(@PathVariable("storeId") String storeId) {
        Store store = crudService.findStoreById(UUID.fromString(storeId));
        JSONObject results = new JSONObject();
        results.put("store_name", store.getStore_name());
        results.put("address", store.getAddress());
        results.put("contact", store.getPhone_number());
        results.put("averageStars", Math.round(store.getReviews().stream().mapToDouble(Review::getRating).average().orElseGet(()-> 0)*100.0)/100.0);

        List<JSONObject> times = new ArrayList<>();
        String openingHours = store.getOpening_hours();
        String[] split = openingHours.split("\n");
        Arrays.stream(split).forEach(v -> {
            JSONObject time = new JSONObject();
            String hours = v.substring(4);
            switch (v.charAt(0)) {
                case '월':
                    time.put("day", "월요일");
                    time.put("hours", hours);
                    break;
                case '화':
                    time.put("day", "화요일");
                    time.put("hours", hours);
                    break;
                case '수':
                    time.put("day", "수요일");
                    time.put("hours", hours);
                    break;
                case '목':
                    time.put("day", "목요일");
                    time.put("hours", hours);
                    break;
                case '금':
                    time.put("day", "금요일");
                    time.put("hours", hours);
                    break;
                case '토':
                    time.put("day", "토요일");
                    time.put("hours", hours);
                    break;
                case '일':
                    time.put("day", "일요일");
                    time.put("hours", hours);
                    break;
            }
            times.add(time);
        });

        results.put("times", times);

        return results.toString();
    }

    @GetMapping("/api/Review/{storeId}") // storeId에 해당하는 store의 리뷰
    public @ResponseBody String getReviews(@PathVariable("storeId") String storeId) {
        Store store = crudService.findStoreById(UUID.fromString(storeId));

        List<JSONObject> reviews = new ArrayList<>();
        AtomicInteger count = new AtomicInteger(store.getReviews().size()+1);
        store.getReviews().stream().sorted().forEach(v -> {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String time = simpleDateFormat.format(v.getDate());
            JSONObject review = new JSONObject();
            review.put("idx", count.decrementAndGet());
            review.put("date", time);
            review.put("nickname", v.getWriter());
            review.put("comment", v.getContents());
            review.put("stars", v.getRating());
            reviews.add(review);
        });

        return reviews.toString();
    }

    @GetMapping("/api/Menu/{storeId}") // storeId에 해당하는 store의 메뉴
    public @ResponseBody String getMenus(@PathVariable("storeId") String storeId) {
        Store store = crudService.findStoreById(UUID.fromString(storeId));

        List<JSONObject> menus = new ArrayList<>();
        store.getMenus().forEach(v -> {
            JSONObject menu = new JSONObject();
            menu.put("menu_name", v.getMenu_name());
            menu.put("menu_id", v.getMenu_id());
            menu.put("price", v.getPrice());
            menus.add(menu);
        });

        return menus.toString();
    }

}

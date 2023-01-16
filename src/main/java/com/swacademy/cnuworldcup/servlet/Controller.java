package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.entity.*;
import com.swacademy.cnuworldcup.service.CRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Slf4j
@RestController
@AllArgsConstructor
public class Controller {
    @Autowired
    CRUDService crudService;

    @GetMapping("/AllCategory")
    public @ResponseBody String getAllCategory() {
        List<JSONObject> results = new ArrayList<>();
        List<Category> categories = crudService.findAllCategories();
        for (Category category : categories) {
            JSONObject json = new JSONObject();
            json.put("category_id", category.getCategory_id());
            json.put("category_name", category.getCategory_name());
            json.put("favorite", category.getLike_num());

            results.add(json);
        }
        return results.toString();
    }

    @GetMapping("/AllCategory/{categoryId}")
    public @ResponseBody String getOneCategory(@PathVariable("categoryId") String categoryId) {
        JSONObject results = new JSONObject();
        Category category = crudService.findCategoryById(UUID.fromString(categoryId));
        results.put("category_id", category.getCategory_id());
        results.put("category_name", category.getCategory_name());
        results.put("favorite", category.getLike_num());
        return results.toString();
    }

    @GetMapping("/Ranking/{categoryId}") //categoryId에 해당하는 가게들의 리스트 반환(랭킹결과 가게순위 확인시)
    public @ResponseBody String getStoreOfCategory(@PathVariable("categoryId") String categoryId) {
        List<JSONObject> results = new ArrayList<>();
        Category category = crudService.findCategoryById(UUID.fromString(categoryId));
        category.getRelations().stream().sorted(((a, b) -> b.getWin_count() - a.getWin_count())).forEach((v) -> {
            JSONObject json = new JSONObject();
            json.put("store_id", v.getStore().getStore_id());
            json.put("store_name", v.getStore().getStore_name());
            double averageStars = v.getStore().getReviews().stream().mapToInt(Review::getRating).average().orElse(0);
            json.put("stars", averageStars);
            json.put("winningCount", v.getWin_count());

            results.add(json);
        });

        return results.toString();
    }

    @GetMapping("/AllStore") // DB에 존재하는 모든 가게들을 반환(월드컵 제작용)
    public @ResponseBody String getAllStore() {
        List<JSONObject> results = new ArrayList<>();
        List<Store> allStores = crudService.findAllStores();

        for (Store store : allStores) {
            JSONObject json = new JSONObject();
            json.put("store_id", store.getStore_id());
            json.put("store_name", store.getStore_name());

            results.add(json);
        }

        return results.toString();
    }

    @GetMapping("/Round/{categoryId}/{numOfRound}") // categoryId에 해당하는 numOfRound개의 가게리스트 반환(월드컵에 필요한 가게들을 얻을때)
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

    @GetMapping("/Result/{categoryId}/{storeId}") // categoryId에 해당하는 storeId의 코멘트와 랭킹정보 반환(내가 선택한 1위 가게의 정보 출력시)
    public @ResponseBody String getWinnerResult(@PathVariable("categoryId") String categoryId, @PathVariable("storeId") String storeId) {
        JSONObject results = new JSONObject();
        List<Relation> relations = crudService.findCategoryById(UUID.fromString(categoryId))
                .getRelations()
                .stream()
                .sorted((a, b) -> b.getWin_count() - a.getWin_count())
                .toList();

        Store store = crudService.findStoreById(UUID.fromString(storeId));
        double averageStars = store.getReviews().stream().mapToInt(Review::getRating).average().orElse(0);
        Relation rank = store.getRelations().stream().filter(v -> Objects.equals(v.getCategory().getCategory_id().toString(), categoryId)).findFirst().get();
        List<String> list = new ArrayList<>();
        store.getComments().forEach(v -> {

            list.add(v.getContents().toString());
        });
        results.put("store_name", store.getStore_name());
        results.put("rank", relations.indexOf(rank) + 1);
        results.put("stars", averageStars);
        results.put("comments", list);

        return results.toString();
    }

    @GetMapping("/StoreInfo/{storeId}") // storeId에 해당하는 store의 상세정보
    public @ResponseBody String getStoreInfo(@PathVariable("storeId") String storeId) {
        Store store = crudService.findStoreById(UUID.fromString(storeId));
        JSONObject results = new JSONObject();
        results.put("store_name", store.getStore_name());
        results.put("address", store.getAddress());
        results.put("contact", store.getPhone_number());
        List<JSONObject> menus = new ArrayList<>();
        store.getMenus().forEach(v -> {
            JSONObject menu = new JSONObject();
            menu.put("menu_name", v.getMenu_name());
            menu.put("menu_id", v.getMenu_id());
            menu.put("price", v.getPrice());
            menus.add(menu);
        });
        results.put("menu", menus);
        List<JSONObject> reviews = new ArrayList<>();
        store.getReviews().forEach(v -> {
            JSONObject review = new JSONObject();
            review.put("date", v.getDate());
            review.put("nickname", v.getWriter());
            review.put("comment", v.getContents());
            review.put("stars", v.getRating());
            reviews.add(review);
        });
        results.put("reviews", reviews);

        List<JSONObject> times = new ArrayList<>();
        String openingHours = store.getOpening_hours();
        String[] split = openingHours.split("\n");
        Arrays.stream(split)
                .forEach(v -> {
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
}

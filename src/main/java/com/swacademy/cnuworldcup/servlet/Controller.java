package com.swacademy.cnuworldcup.servlet;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swacademy.cnuworldcup.entity.*;
import com.swacademy.cnuworldcup.entity.Menu;
import com.swacademy.cnuworldcup.service.CRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.type.descriptor.java.ObjectJavaType;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.*;
import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
public class Controller {
    @Autowired
    CRUDService crudService;

    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\frontend\\public\\img").getAbsolutePath();

    @GetMapping("/AllCategory")
    public @ResponseBody String getAllCategory() {
        List<JSONObject> results = new ArrayList<>();
        List<Category> categories = crudService.findAllCategories();
        for (Category category : categories) {
            JSONObject json = new JSONObject();
            json.put("category_id", category.getCategory_id());
            json.put("category_name", category.getCategory_name());
            json.put("favorite", category.getLike_num());
            json.put("num_of_stores", (long) category.getRelations().size());

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
            json.put("address", store.getAddress());
            json.put("numOfReviews", store.getReviews().size());
            json.put("averageStars", Math.round(store.getReviews().stream().mapToDouble(Review::getRating).average().orElseGet(()-> 0)*100.0)/100.0);

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
        List<Relation> relations = crudService.findCategoryById(UUID.fromString(categoryId)).getRelations().stream().sorted((a, b) -> b.getWin_count() - a.getWin_count()).toList();

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
        results.put("averageStars", Math.round(store.getReviews().stream().mapToDouble(Review::getRating).average().orElseGet(()-> 0)*100.0)/100.0);
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

    @GetMapping("/StoreMenusInfo/{storeId}") // storeId에 해당하는 store의 메뉴 정보
    public @ResponseBody String getStoreMenusInfo(@PathVariable("storeId") String storeId) {
        Store store = crudService.findStoreById(UUID.fromString(storeId));
        List<JSONObject> results = new ArrayList<>();
        store.getMenus().forEach(v -> {
            JSONObject menu = new JSONObject();
            menu.put("menu_name", v.getMenu_name());
            menu.put("menu_id", v.getMenu_id());
            menu.put("price", v.getPrice());
            results.add(menu);
        });

        return results.toString();
    }

    // ==================================== Post =========================================== //
    @PostMapping(value = "/admin/requestStoreAdd")
    public String AddNewStore(String storeDto, MultipartFile[] files) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> storeMap = mapper.readValue(storeDto, Map.class);

        UUID storeID = UUID.randomUUID();
        Store store = Store.builder().store_id(storeID).address(storeMap.get("address")).opening_hours(storeMap.get("opening_hours")).store_name(storeMap.get("store_name")).phone_number(storeMap.get("phone_number")).build();
        crudService.saveStore(store);

        File fileSave = new File(IMAGE_FILE_UPLOAD_PATH, storeID.toString() + ".jpg");
        files[0].transferTo(fileSave);
        saveFormattedImage(storeID.toString(), 1000, 1000);

        return "새로운 가게 등록 완료";
    }

    @PostMapping(value = "/requestReviewAdd")
    public String AddNewReview(String reviewDto) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> reviewMap = mapper.readValue(reviewDto, Map.class);

        UUID reviewId = UUID.randomUUID();

        Store store = crudService.findStoreById(UUID.fromString((String) reviewMap.get("store_id")));

        Review review = Review.builder()
                .review_id(reviewId)
                .writer((String) reviewMap.get("writer"))
                .rating(Integer.parseInt((String) reviewMap.get("rating")))
                .store(store)
                .contents((String) reviewMap.get("contents"))
                .password((String) reviewMap.get("password"))
                .date(new Timestamp(System.currentTimeMillis()))
                .build();
        crudService.saveReview(review);
        
        return "리뷰 등록 완료";
    }

    @PostMapping(value = "/requestStoreRemove")
    public String removeStore(String storeDto) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> storeMap = mapper.readValue(storeDto, Map.class);

        String storeId = storeMap.get("store_id");
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
        // Store와 연관된 모든 Review 삭제
        for (Review review : crudService.findReviewByStoreId(UUID.fromString(storeId))) {
            crudService.removeReview(review);
        }

        crudService.removeStore(removeStore);

        // 사진 삭제
        deleteImage(storeId);
        return "가게 삭제 완료";
    }

    @PostMapping(value = "/requestCategoryAdd")
    public String AddNewCategory(String categoryDto) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> categoryMap = mapper.readValue(categoryDto, Map.class);

        ArrayList<String> storeList = (ArrayList<String>) categoryMap.get("stores");

        if (storeList.size() < 2) {
            return "가게를 2개 이상 등록해야 합니다.";
        }

        UUID categoryId = UUID.randomUUID();
        Category category = Category.builder().category_id(categoryId).category_name((String) categoryMap.get("category_name")).like_num(0)
                //.relations()
                .build();
        crudService.saveCategory(category);

        for (String storeId : storeList) {
            Store store = crudService.findStoreById(UUID.fromString(storeId));
            Relation relation = Relation.builder().relation_id(UUID.randomUUID()).win_count(0).store(store).category(category).build();
            crudService.saveRelation(relation);
        }

        combineAndSaveImage(storeList.get(0), storeList.get(1), categoryId.toString());

        return "새로운 카테고리 등록 완료";
    }

    @PostMapping(value = "/requestCategoryRemove")
    public String removeCategory(String categoryDto) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> categoryMap = mapper.readValue(categoryDto, Map.class);

        String categoryId = categoryMap.get("category_id");
        Category removeCategory = crudService.findCategoryById(UUID.fromString(categoryId));

        List<Relation> relations = crudService.findRelationsByCategoryId(UUID.fromString(categoryId));
        for (Relation r : relations) {
            crudService.removeRelation(r);
        }
        crudService.removeCategory(removeCategory);

        // 사진 삭제
        deleteImage(categoryId);

        return "카테고리 삭제 완료";
    }

    @PostMapping(value = "/admin/requestMenuAdd")
    public String AddNewMenu(String menuDto, MultipartFile[] file) throws IOException {

        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> menuMap = mapper.readValue(menuDto, Map.class);

        UUID menuID = UUID.randomUUID();
        Menu menu = Menu.builder()
                .menu_id((menuID))
                .menu_name(menuMap.get("menu_name"))
                .price(Integer.parseInt(menuMap.get("price")))
                .store(crudService.findStoreById(UUID.fromString(menuMap.get("store_id"))))
                .build();
        crudService.saveMenu(menu);

        File fileSave = new File(IMAGE_FILE_UPLOAD_PATH, menuID.toString() + ".jpg");
        file[0].transferTo(fileSave);
        saveFormattedImage(menuID.toString(), 1000, 1000);

        return "새로운 메뉴 등록 완료";
    }

    @PostMapping(value = "/requestMenuRemove")
    public String removeMenu(String selectedMenuId) throws IOException {

        String[] menuId = selectedMenuId.split(",");

        for(String id : menuId) {
            Menu removeMenu = crudService.findMenuById(UUID.fromString(id));
            crudService.removeMenu(removeMenu);
            deleteImage(id);
        }

        return "선택한 메뉴 삭제 완료";
    }

    @PostMapping(value = "/requestCommentRemove")
    public String removeComment(String commentDto) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> commentMap = mapper.readValue(commentDto, Map.class);

        String commentId = commentMap.get("comment_id");
        Comment removeComment = crudService.findCommentById(UUID.fromString(commentId));

        crudService.removeComment(removeComment);

        return "코멘트 삭제 완료";
    }

    @PostMapping(value = "/requestReviewRemove")
    public String removeReview(String reviewDto) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> reviewMap = mapper.readValue(reviewDto, Map.class);

        String reviewId = reviewMap.get("comment_id");
        Review removeReview = crudService.findReviewById(UUID.fromString(reviewId));

        crudService.removeReview(removeReview);

        return "리뷰 삭제 완료";
    }

    // 가게, 메뉴, 카테고리 등 이미지있는 엔티티 삭제시 호출할 것!
    private void deleteImage(String id) {
        // 사진 삭제
        File toDelete = new File(IMAGE_FILE_UPLOAD_PATH, id + ".jpg");
        if (toDelete.exists()) {
            if (toDelete.delete()) {
                log.info("Image {}.jpg has been deleted", id);
            } else {
                log.info("Image {}.jpg cannot be deleted because it is in use.", id);
            }
        } else {
            log.info("Can not find Image {}.jpg", id);
        }
    }

    private void combineAndSaveImage(String id1, String id2, String combineId) throws IOException {
        // 카테고리 이미지 생성
        BufferedImage img1 = null;
        BufferedImage img2 = null;
        BufferedImage combine_img = null;
        try {
            img1 = ImageIO.read(new File(IMAGE_FILE_UPLOAD_PATH, id1 + ".jpg"));
            img2 = ImageIO.read(new File(IMAGE_FILE_UPLOAD_PATH, id2 + ".jpg"));

            int width = img1.getWidth() + img2.getWidth();
            int height = Math.max(img1.getHeight(), img2.getHeight());
            combine_img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D graphics = (Graphics2D) combine_img.getGraphics();

            graphics.setBackground(Color.WHITE);
            graphics.drawImage(img1, 0, 0, null);
            graphics.drawImage(img2, img1.getWidth(), 0, null);
            graphics.dispose();
        } catch (IOException e) {
            log.info("Cannot find Image: {}.jpg, {}.jpg", id1, id2);
            log.info("Combined Image is Set Default");
            combine_img = new BufferedImage(100, 100, BufferedImage.TYPE_INT_RGB);
        }

        // 카테고리 이미지 저장
        ImageIO.write(combine_img, "jpg", new File(IMAGE_FILE_UPLOAD_PATH, combineId + ".jpg"));
    }

    // 사진 저장후 호출할 것. default: 1000x1000
    private void saveFormattedImage(String id, int resizeWidth, int resizeHeight) throws IOException {
        // 사진 삭제
        File toFormat = new File(IMAGE_FILE_UPLOAD_PATH, id + ".jpg");
        if (toFormat.exists()) {
            BufferedImage bufferedImageInput = ImageIO.read(toFormat);
            BufferedImage bufferedImageOutput = new BufferedImage(resizeWidth, resizeHeight, bufferedImageInput.getType());

            Graphics2D graphics = bufferedImageOutput.createGraphics();
            graphics.drawImage(bufferedImageInput, 0, 0, resizeWidth, resizeHeight, null);
            graphics.dispose();
            ImageIO.write(bufferedImageOutput, "jpg", new File(IMAGE_FILE_UPLOAD_PATH, id + ".jpg"));

            log.info("Image {}.jpg has been resized {} x {}", id, resizeWidth, resizeHeight);

        } else {
            log.info("Can not find Image {}.jpg", id);
        }
    }
}

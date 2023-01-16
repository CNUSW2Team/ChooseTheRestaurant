package com.swacademy.cnuworldcup.servlet;

import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@AllArgsConstructor
public class FakeController {
    @GetMapping("/F/Ranking/{categoryId}") //categoryId에 해당하는 가게들의 리스트 반환(랭킹결과 가게순위 확인시)
    public @ResponseBody String getStoreOfCategory() {
        List<JSONObject> results = new ArrayList<>();

        JSONObject json1 = new JSONObject();
        json1.put("store_id", "0c8eeaaa-eee8-4318-989b-c765aa691a9a");
        json1.put("store_name", "청춘우동");
        json1.put("winningCount", 24);
        json1.put("stars", 4.7);

        JSONObject json2 = new JSONObject();
        json2.put("store_id", "3ee3785d-afe3-46f5-999e-ae77a0dc8d06");
        json2.put("store_name", "리코타코");
        json2.put("winningCount", 44);
        json2.put("stars", 4.9);

        results.add(json1);
        results.add(json2);

        return results.toString();
    }

    @GetMapping("/F/AllCategory") // DB에 존재하는 모든 카테고리들 반환(카테고리 리스트 띄울때)
    public @ResponseBody String getAllCategory() {
        List<JSONObject> results = new ArrayList<>();


        JSONObject json1 = new JSONObject();
        json1.put("name", "분위기 좋은 맛집");
        json1.put("category_id", "0b44cd73-6ab8-4500-9d07-fbc9cdfa03bd");
        json1.put("favorite", 24);

        JSONObject json2 = new JSONObject();
        json2.put("name", "가성비 좋은");
        json2.put("category_id", "d56506ba-3265-49c0-9bbd-866fcee19871");
        json2.put("favorite", 20);

        results.add(json1);
        results.add(json2);

        return results.toString();
    }

    // !! 카테고리/선택카테고리 

    @GetMapping("/F/AllStore") // DB에 존재하는 모든 가게들을 반환(월드컵 제작용)
    public @ResponseBody String getAllStore() {
        List<JSONObject> results = new ArrayList<>();

        JSONObject json1 = new JSONObject();
        json1.put("store_id", "0c8eeaaa-eee8-4318-989b-c765aa691a9a");
        json1.put("store_name", "청춘우동");

        JSONObject json2 = new JSONObject();
        json2.put("store_id", "3ee3785d-afe3-46f5-999e-ae77a0dc8d06");
        json2.put("store_name", "리코타코");

        results.add(json1);
        results.add(json2);

        return results.toString();
    }

    @GetMapping("/F/Round/{categoryId}/{numOfRound}") // categoryId에 해당하는 numOfRound개의 가게리스트 반환(월드컵에 필요한 가게들을 얻을때)
    public @ResponseBody String getRoundStore() {
        List<JSONObject> results = new ArrayList<>();

        JSONObject json1 = new JSONObject();
        json1.put("name", "리코타코");
        json1.put("store_id", "3ee3785d-afe3-46f5-999e-ae77a0dc8d06");

        JSONObject json2 = new JSONObject();
        json2.put("name", "청춘우동");
        json2.put("store_id", "0c8eeaaa-eee8-4318-989b-c765aa691a9a");

        results.add(json1);
        results.add(json2);

        return results.toString();
    }

    @GetMapping("/F/Result/{categoryId}/{storeId}") // categoryId에 해당하는 storeId의 코멘트와 랭킹정보 반환(내가 선택한 1위 가게의 정보 출력시)
    // 프론트상에선 categoryId 필요x, 백에 데이터 보내야하니까 놔둘까?
    public @ResponseBody String getWinnerResult() {
        List<JSONObject> results = new ArrayList<>();

        List<String> comments = new ArrayList<>();
        comments.add("맛있어요");
        comments.add("개쩔어용!");
        comments.add("타코가존맛");

        JSONObject json1 = new JSONObject();
        json1.put("rank", 5);
        json1.put("stars", 4);
        json1.put("comments", comments);


        results.add(json1);

        return results.toString();
    }

    @GetMapping("/F/StoreInfo/{storeId}") // storeId에 해당하는 store의 상세정보
    public @ResponseBody String getStoreInfo() {
        //메뉴
        JSONObject menu1 = new JSONObject();
        menu1.put("menu_id", "추가필요");
        menu1.put("menu", "돈까스");
        menu1.put("price", 8000);
        JSONObject menu2 = new JSONObject();
        menu2.put("menu_id", "추가필요");
        menu2.put("menu", "돈까스");
        menu2.put("price", 8000);

        List<JSONObject> menus = new ArrayList<>();
        menus.add(menu1);
        menus.add(menu2);

        //리뷰
        JSONObject review1 = new JSONObject();
        review1.put("stars", 4);
        review1.put("comment", "맛있군요..");
        review1.put("nickname", "오이시");
        review1.put("date", "2023-01-12");
        JSONObject review2 = new JSONObject();
        review2.put("stars", 1);
        review2.put("comment", "맛없어요");
        review2.put("nickname", "즐");
        review2.put("date", "2023-01-12");
        JSONObject review3 = new JSONObject();
        review3.put("stars", 5);
        review3.put("comment", "개존맛");
        review3.put("nickname", "꿀맛");
        review3.put("date", "2023-01-12");

        List<JSONObject> reviews = new ArrayList<>();
        reviews.add(review1);
        reviews.add(review2);
        reviews.add(review3);

        //시간
        JSONObject mon = new JSONObject();
        mon.put("day", "월");
        mon.put("openTime", "08:00");
        mon.put("closeTime", "18:00");
        JSONObject tue = new JSONObject();
        tue.put("day", "화");
        tue.put("openTime", "08:00");
        tue.put("closeTime", "18:00");


        List<JSONObject> time = new ArrayList<>();
        time.add(mon);
        time.add(tue);


        JSONObject result = new JSONObject();
        result.put("address", "대전광역시 유성구 궁동 410");
        result.put("contact", "042-823-7234");
        result.put("menus", menus);
        result.put("reviews", reviews);
        result.put("time", time);

        return result.toString();
    }
}


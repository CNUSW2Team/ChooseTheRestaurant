
package com.swacademy.cnuworldcup.servlet;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swacademy.cnuworldcup.entity.*;
import com.swacademy.cnuworldcup.service.CRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

import static com.swacademy.cnuworldcup.util.Util.saveFormattedImage;


@Slf4j
@RestController
@AllArgsConstructor
public class PutController {
    @Autowired
    CRUDService crudService;

    //    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\frontend\\public\\img").getAbsolutePath();
    final String IMAGE_FILE_UPLOAD_PATH = new File("src\\main\\resources\\image\\").getAbsolutePath();

    @PutMapping(value = "/api/admin/Store")
    public void updateStore(String storeDto, MultipartFile[] img, String[] menu_name, String[] price, String[] tag) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> storeMap = mapper.readValue(storeDto, Map.class);

        Store store = crudService.findStoreById(UUID.fromString(storeMap.get("storeId")));

        String newAddress = storeMap.get("address");
        String newPhoneNumber = storeMap.get("phoneNumber");
        if (!newAddress.equals("")) store.setAddress(newAddress);
        if (!newPhoneNumber.equals("")) store.setPhone_number(newPhoneNumber);

        crudService.saveStore(store);

        if (menu_name != null) {
            int menuLength = menu_name.length;
            for (int i = 0; i < menuLength; i++) {
                Menu menu = Menu.builder().menu_id(UUID.randomUUID()).menu_name(menu_name[i]).price(Integer.parseInt(price[i])).store(store).build();
                crudService.saveMenu(menu);

                String[] tags = menuLength == 1 ? tag : tag[i].split(",");

                for (String t : tags) {
                    Tag tagByName = crudService.findTagByName(t);
                    MenuTag menuTag = MenuTag.builder().menu_tag_id(UUID.randomUUID()).menu(menu).tag(tagByName).build();
                    crudService.saveMenuTag(menuTag);
                }

                File menuImg = new File(IMAGE_FILE_UPLOAD_PATH, menu.getMenu_id().toString() + ".jpg");
                img[i].transferTo(menuImg);
                saveFormattedImage(IMAGE_FILE_UPLOAD_PATH, menu.getMenu_id().toString(), 1000, 1000);
            }
        }
    }

    @PutMapping(value = "/api/Favorite/{categoryId}/{mode}")
    public void updateFavorite(@PathVariable("categoryId") String categoryId, @PathVariable("mode") String mode) {
        Category category = crudService.findCategoryById(UUID.fromString(categoryId));

        if(mode.equals("increase")){
            category.setLike_num(category.getLike_num()+1);
        }
        else if(mode.equals("decrease")){
            category.setLike_num(category.getLike_num()-1);
        }

        crudService.saveCategory(category);
    }

}

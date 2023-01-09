package com.swacademy.cnuworldcup.servlet;

import com.swacademy.cnuworldcup.Repository.StoreRepository;
import com.swacademy.cnuworldcup.entity.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class StoreController {

    @Autowired
    private final StoreRepository storeRepository;

    public StoreController(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    @GetMapping("/store/all")
    public List<Store> allStores(){
        return storeRepository.findAll();
    }

    @GetMapping(value = "image/{id}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getImage(@PathVariable("id") String id) throws IOException {
        String path = "src/main/resources/static/images/";
        FileSystemResource resource = new FileSystemResource(path + id + ".jpg");
        HttpHeaders header = new HttpHeaders();
        Path filePath = null;
        filePath = Paths.get(path+id);
        header.add("Content-Type", Files.probeContentType(filePath));
        return new ResponseEntity<Resource>(resource, header, HttpStatus.OK);
    }

    @GetMapping(value = "store/{storeId}")
    public Optional<Store> storeInfo(@PathVariable("storeId") String storeId) {
        return storeRepository.findById(UUID.fromString(storeId));
    }
}

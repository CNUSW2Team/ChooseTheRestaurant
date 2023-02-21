package com.swacademy.cnuworldcup.util;

import lombok.extern.slf4j.Slf4j;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Slf4j
public class Util {

    public static void deleteImage(String path, String id) {
        // 사진 삭제
        File toDelete = new File(path, id + ".jpg");
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

    public static void combineAndSaveImage(String path, String id1, String id2, String combineId) throws IOException {
        // 카테고리 이미지 생성
        BufferedImage img1 = null;
        BufferedImage img2 = null;
        BufferedImage combine_img = null;
        try {
            img1 = ImageIO.read(new File(path, id1 + ".jpg"));
            img2 = ImageIO.read(new File(path, id2 + ".jpg"));

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
        ImageIO.write(combine_img, "jpg", new File(path, combineId + ".jpg"));
    }

    // 사진 저장후 호출할 것. default: 1000x1000
    public static void saveFormattedImage(String path, String id, int resizeWidth, int resizeHeight) throws IOException {
        // 사진 삭제
        File toFormat = new File(path, id + ".jpg");
        if (toFormat.exists()) {
            BufferedImage bufferedImageInput = ImageIO.read(toFormat);
            BufferedImage bufferedImageOutput = new BufferedImage(resizeWidth, resizeHeight, bufferedImageInput.getType());

            Graphics2D graphics = bufferedImageOutput.createGraphics();
            graphics.drawImage(bufferedImageInput, 0, 0, resizeWidth, resizeHeight, null);
            graphics.dispose();
            ImageIO.write(bufferedImageOutput, "jpg", new File(path, id + ".jpg"));

            log.info("Image {}.jpg has been resized {} x {}", id, resizeWidth, resizeHeight);

        } else {
            log.info("Can not find Image {}.jpg", id);
        }
    }
}

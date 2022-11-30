package com.jamit.File.service;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.jamit.File.repository.UploadRepository;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileUploadService {

    private final UploadRepository s3Service;

    public String uploadImage(MultipartFile file) throws IllegalAccessException {
        String fileName = createFileName(file.getOriginalFilename());

        ObjectMetadata objectMetadata = new ObjectMetadata();

        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try (InputStream inputStream = file.getInputStream()) {
            s3Service.uploadFile(inputStream, objectMetadata, fileName);
        } catch (IOException e) {
            throw new IllegalAccessException(
                String.format("파일 변환 중에러가 발생하였습니다.(%s)", file.getOriginalFilename()));
        }

        return s3Service.getFileUrl(fileName);
    }

    private String createFileName(String originalFileName) throws IllegalAccessException {

        return UUID.randomUUID().toString().concat(getFileExtension(originalFileName));
    }

    private String getFileExtension(String fileName) throws IllegalAccessException {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new IllegalAccessException(String.format("잘못된 형식의 파일($s) 입니다", fileName));
        }
    }
}
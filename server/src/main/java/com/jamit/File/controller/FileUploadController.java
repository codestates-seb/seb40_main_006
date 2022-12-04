package com.jamit.File.controller;

import com.jamit.File.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @PostMapping("/upload")
    public String uploadFile(@RequestPart MultipartFile file) throws IllegalAccessException {

        return fileUploadService.uploadImage(file);
    }
}
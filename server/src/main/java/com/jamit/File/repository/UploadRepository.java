package com.jamit.File.repository;

import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.InputStream;

public interface UploadRepository {

    void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName);

    String getFileUrl(String fileName);
}
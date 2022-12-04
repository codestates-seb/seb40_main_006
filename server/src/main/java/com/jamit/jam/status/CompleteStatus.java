package com.jamit.jam.status;

public enum CompleteStatus {
    FALSE("모집중"),
    TRUE("모집완료");

    private final String status;

    CompleteStatus(String status) {
        this.status = status;
    }
}
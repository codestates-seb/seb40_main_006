package com.jamit.jam.status;

public enum ParticipantStatus {
    NONE("참여하기"),
    TRUE("참여중"),
    FALSE("참여취소");

    private final String status;

    ParticipantStatus(String status) {
        this.status = status;
    }
}
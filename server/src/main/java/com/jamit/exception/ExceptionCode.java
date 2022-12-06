package com.jamit.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    SIGNUP_EXISTS_EMAIL(409, "This is a registered email"),
    SIGNUP_EXISTS_NICKNAME(409, "This is a registered nickname"),
    NO_AUTHORITY(403, "You don’t have Authority"),
    LOGIN_REQUIRED(401, "You need to login"),
    INVALID_AUTHCODE(403, "Invaild authentication Code"),
    JAM_NOT_FOUND(404, "Jam not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    REPLY_NOT_FOUND(404, "Reply not found"),
    CAN_NOT_GRADE(404, "Can not grade");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}

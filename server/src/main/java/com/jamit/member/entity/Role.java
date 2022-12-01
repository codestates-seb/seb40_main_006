package com.jamit.member.entity;

import lombok.Getter;

public enum Role {
    USER("ROLE_USER"),
    ADMIN("ROLE_ADMIN");

    @Getter
    private String status;

    Role(String status) {
        this.status = status;
    }
}

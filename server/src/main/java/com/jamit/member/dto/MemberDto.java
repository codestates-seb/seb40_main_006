package com.jamit.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public static class Signup {

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String password;

        @NotBlank
        private String nickname;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private Long memberId;
        private String email;
        private String nickname;
    }

}

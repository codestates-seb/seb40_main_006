package com.jamit.member.dto;

import java.util.List;
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
    public static class UpdateMember {

        private Long memberId;

        public void setMemberId(Long memberId) {
            this.memberId = memberId;
        }

        @NotBlank
        private String nickname;

        @NotBlank
        private String password;

        private String image;

    }

    @Getter
    @AllArgsConstructor
    public static class MemberInfoResponse {

        private Long memberId;
        private String email;
        private String nickname;
        private String password;
        private String image;
        private List<String> roles;
    }

    @Getter
    @AllArgsConstructor
    public static class UpdateResponse {

        private Long memberId;
        private String email;
        private String nickname;
        private String image;
    }

    @Getter
    @AllArgsConstructor
    public static class ProfileResponse {
        private Long memberId;
        private String email;
        private String nickname;
        private String image;
    }

}
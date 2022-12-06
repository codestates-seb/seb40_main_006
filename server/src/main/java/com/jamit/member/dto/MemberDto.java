package com.jamit.member.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
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
    public static class findPassword {

        @NotBlank
        @Email
        private String email;

        @NotBlank
        private String tempPassword;

    }

    @Getter
    @AllArgsConstructor
    public static class sendTempPassword {

        @NotBlank
        @Email
        private String email;

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

        private String nickname;

        private String password;

        private String profileImage;

    }

    @Getter
    @AllArgsConstructor
    public static class UpdateResponse {

        private Long memberId;
        private String email;
        private String nickname;
        private String profileImage;
    }


}
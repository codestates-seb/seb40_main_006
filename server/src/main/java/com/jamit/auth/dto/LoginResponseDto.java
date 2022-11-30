package com.jamit.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private Long memberId;
    private String nickname;
    private String profileImage;
}

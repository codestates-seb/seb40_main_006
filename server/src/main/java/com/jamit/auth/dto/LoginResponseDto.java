package com.jamit.auth.dto;

import javax.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponseDto {
    private Long memberId;
    private String nickname;
    private String profileImage;
    private Double grade;
    private int gradeCount;
}

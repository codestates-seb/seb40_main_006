package com.jamit.jam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseParticipantDto {
    private Long memberId;
    private String username;
    // 유저이미지 추가
}

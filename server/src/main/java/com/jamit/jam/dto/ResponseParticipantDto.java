package com.jamit.jam.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseParticipantDto {
    private Long memberId;
    private String nickname;
    private String image;
}

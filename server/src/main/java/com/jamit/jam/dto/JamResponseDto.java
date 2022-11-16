package com.jamit.jam.dto;

import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
//@Getter
//@Builder
@Data
public class JamResponseDto {

    private Long jamId;
    private String nickname;
    private String content;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private int currentPpl;
    private int maximum;
    private int capacity;
    private boolean realTime;
    private boolean complete;
    private int views;
    private Double latitude;    // 위도
    private Double longitude;   // 경도

}

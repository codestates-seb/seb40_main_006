package com.jamit.jam.dto;

import com.jamit.jam.entity.Jam;
import com.jamit.member.dto.MemberDto;
import lombok.*;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Getter
@Builder
public class JamResponseDto {

    private Long id;
    private Long userId;
    private String nickname;
    private String title;
    private String content;
    private String category;
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

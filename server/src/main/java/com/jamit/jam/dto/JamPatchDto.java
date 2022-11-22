package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JamPatchDto {

    private Category category;
    private String title;
    private String content;
    private String image;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Integer capacity;
    private boolean realTime;
    private String address;
    private String location;
    private String latitude;    // 위도
    private String longitude;   // 경도
    private String openChatLink;
}

package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JamPostDto {

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
    private String latitude;
    private String longitude;
    private String openChatLink;
}

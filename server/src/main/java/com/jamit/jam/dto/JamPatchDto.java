package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.jam.status.CompleteStatus;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JamPatchDto {

    private Long id;
    private Category category;
    private String title;
    private String content;
    private String image;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Integer capacity;
    private boolean realTime;
    private CompleteStatus completeStatus;
    private String address;
    private String location;
    private String latitude;
    private String longitude;
    private String openChatLink;
}

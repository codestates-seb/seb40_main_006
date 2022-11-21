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

    private String title;
    private Category category;
    private Integer maximum;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private boolean realTime;
    private String content;
}

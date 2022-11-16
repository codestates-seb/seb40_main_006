package com.jamit.jam.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class JamRequestDto {
    Long id;
    String title;
    String content;
    LocalDateTime JamFrom;
    LocalDateTime JamTo;
    int currentPpl;
    int maximum;
    int capacity;
    boolean realTime;
    boolean complete;
    int views;
    Double longitude;
    Double latitude;
    Double Diff_Distance;
}

package com.jamit.location.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LocationRequestDto {
    private Double latitude;    // 위도(y) 37.554580
    private Double longitude;   // 경도(x) 126.970730
}

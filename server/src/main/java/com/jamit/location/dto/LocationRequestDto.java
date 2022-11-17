package com.jamit.location.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
//@Data   // 원래는 setter 때문에 막 쓰면 안 되는데 우리팀은 setter 쓰기로 했으니까 일단 Data 어노테이션으로 만들자
@Getter
@Setter
public class LocationRequestDto {
    private Double latitude;    // 위도(y) 37.554580
    private Double longitude;   // 경도(x) 126.970730
}

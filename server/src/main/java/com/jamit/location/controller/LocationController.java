package com.jamit.location.controller;

import com.jamit.global.dto.MultiResponseDto;
import com.jamit.jam.entity.Jam;
import com.jamit.location.mapper.LocationMapper;
import com.jamit.location.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class LocationController {

    private final LocationService locationService;
    private final LocationMapper mapper;


    // 현위치 기준 근처 Jam 목록 조회 --> 수정 필요
    @GetMapping("/location")
    public ResponseEntity getNearJamList(@RequestParam(value = "lat") String lat, @RequestParam(value = "lon") String lon) throws IOException {

        Double latitude = Double.parseDouble(lat);
        Double longitude = Double.parseDouble(lon);

        List<Jam> jams = locationService.getNearByJams(latitude, longitude, 2.0);

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.jamsToJamResponseDto(jams)), HttpStatus.OK);
    }

}

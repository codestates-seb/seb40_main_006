package com.jamit.location.controller;

import com.jamit.global.dto.MultiResponseDto;
import com.jamit.jam.entity.Jam;
import com.jamit.location.dto.LocationRequestDto;
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

    @PostMapping("/location")
    public ResponseEntity getNearJamList(@RequestBody LocationRequestDto locationRequestDto) throws IOException {
        List<Jam> jams = locationService.getNearByJams(locationRequestDto.getLatitude(), locationRequestDto.getLongitude(), 2.0);
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.jamsToJamResponseDto(jams)), HttpStatus.OK);      // 여기 페이네이션 하나?
    }

}

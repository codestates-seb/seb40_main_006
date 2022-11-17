package com.jamit.jam.controller;

import com.jamit.global.dto.SingleResponseDto;
import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.JamResponseDto;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.mapper.JamMapper;
import com.jamit.jam.service.JamService;
import com.jamit.member.entity.Member;
import com.jamit.member.service.MemberService;
import java.nio.channels.FileChannel.MapMode;
import java.util.UUID;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/jams")
@RequiredArgsConstructor
@Validated
public class JamController {

    private final JamService jamService;
    private final JamMapper mapper;

    @PostMapping("/write")
    public ResponseEntity postJam(@Valid @RequestBody JamPostDto jamPostDto) {
        Jam jam = jamService.createJam(mapper.jamPostDtoToJam(jamPostDto));
        JamResponseDto response = mapper.jamToJamResponseDto(jam);
        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    @PatchMapping("/{jam_id}")
    public ResponseEntity patchJam(@Valid @Positive @PathVariable String jam_id) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{jam_id}")
    public ResponseEntity getJam(@Valid @Positive @PathVariable String jam_id) {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getJams() {

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{jam_id}")
    public ResponseEntity deleteJam(@Valid @Positive @PathVariable String jam_id) {

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

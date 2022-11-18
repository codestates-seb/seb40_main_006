package com.jamit.jam.controller;

import com.jamit.jam.dto.JamPatchDto;
import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.JamResponseDto;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.mapper.JamMapper;
import com.jamit.jam.service.JamService;
import com.jamit.member.entity.Member;
import com.jamit.member.service.MemberService;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jams")
@RequiredArgsConstructor
@Validated
public class JamController {

    private final JamService jamService;
    private final MemberService memberService;
    private final JamMapper mapper;

    @PostMapping("/write")
    public ResponseEntity postJam(@RequestBody JamPostDto jamPostDto) {
        Member member = memberService.findUserByEmail("cheese@cat.com");

        Jam jam = jamService.createJam(mapper.jamPostDtoToJam(jamPostDto), member);
        JamResponseDto response = mapper.jamToJamResponseDto(jam);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{jam_id}")
    public ResponseEntity patchJam(@Valid @PathVariable("jam_id") @Positive Long jamId,
        @RequestBody JamPatchDto jamPatchDto) {
        Jam jam = mapper.jamPatchDtoToJam(jamPatchDto);
        jam.setId(jamId);

        Jam updateJam = jamService.updateJam(jam);

        JamResponseDto response = mapper.jamToJamResponseDto(updateJam);

        return new ResponseEntity<>(response, HttpStatus.OK);
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

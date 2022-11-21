package com.jamit.jam.controller;

import com.jamit.jam.dto.JamPatchDto;
import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.ResponseAllJamsDto;
import com.jamit.jam.dto.ResponseSpecificJamDto;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.mapper.JamMapper;
import com.jamit.jam.repository.JamRepository;
import com.jamit.jam.service.JamService;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final JamMapper mapper;
    private final JamRepository jamRepository;

    @PostMapping("/write")
    public ResponseEntity postJam(@Valid @RequestBody JamPostDto jamPostDto) {
        Jam jam = jamService.createJam(mapper.jamPostDtoToJam(jamPostDto));

        ResponseSpecificJamDto response = mapper.jamToResponseSpecificJamDto(jam);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{jam_id}")
    public ResponseEntity patchJam(@Valid @PathVariable("jam_id") @Positive Long jamId,
        @RequestBody JamPatchDto jamPatchDto) {
        Jam jam = mapper.jamPatchDtoToJam(jamPatchDto);
        jam.setId(jamId);

        Jam updateJam = jamService.updateJam(jam);

        ResponseSpecificJamDto response = mapper.jamToResponseSpecificJamDto(updateJam);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{jam_id}")
    public ResponseEntity getJam(@Valid @PathVariable("jam_id") @Positive Long jamId) {
        Jam jam = jamService.findJam(jamId);

        ResponseSpecificJamDto response = mapper.jamToResponseSpecificJamDto(jam);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public Page<ResponseAllJamsDto> getJams(Pageable pageable) {
        Page<Jam> pageJams = jamRepository.jamPage(pageable);

        Page<ResponseAllJamsDto> response = pageJams.map(mapper::jamToResponseAllJamsDto);

        return response;
    }

    @DeleteMapping("/{jam_id}")
    public ResponseEntity deleteJam(@PathVariable("jam_id") Long jamId) {
        jamService.deleteJam(jamId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

package com.jamit.jam.controller;

import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.global.dto.MultiResponseDto;
import com.jamit.jam.dto.JamPatchDto;
import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.ResponseAllJamsDto;
import com.jamit.jam.dto.ResponseSpecificJamDto;
import com.jamit.jam.entity.Category;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.mapper.JamMapper;
import com.jamit.jam.repository.JamRepository;
import com.jamit.jam.service.JamService;

import com.jamit.member.entity.Member;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jams")
@RequiredArgsConstructor
@Validated
public class JamController {

    private final JamService jamService;
    private final JamMapper mapper;
    private final JamRepository jamRepository;


    /**
     * JAM-01: Jam 생성
     * Authorized: USER
     */
    @PostMapping("/write")
    public ResponseEntity postJam(@Valid @RequestBody JamPostDto jamPostDto,
        Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.LOGIN_REQUIRED);
        } else {
            Jam jam = jamService.createJam(mapper.jamPostDtoToJam(jamPostDto), member);
            ResponseSpecificJamDto response = mapper.jamToResponseSpecificJamDto(jam);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        }
    }

    /**
     * JAM-02: Jam 수정
     * Authorized: USER(Writer)
     */
    @PatchMapping("/{jam_id}")
    public ResponseEntity patchJam(@Valid @PathVariable("jam_id") @Positive Long jamId,
        @RequestBody JamPatchDto jamPatchDto, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        Jam findJam = jamService.findVerifiedJam(jamId);

        if (member.getEmail().equals(findJam.getMember().getEmail())) {
            jamPatchDto.setId(jamId);
            Jam jam = mapper.jamPatchDtoToJam(jamPatchDto);
            Jam updateJam = jamService.updateJam(jam);
            ResponseSpecificJamDto response = mapper.jamToResponseSpecificJamDto(updateJam);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {

            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }
    }

    /**
     * JAM-03: Jam 상세 조회
     * Authorized: ALL
     */
    @GetMapping("/{jam_id}")
    public ResponseEntity getJam(@Valid @PathVariable("jam_id") @Positive Long jamId) {
        Jam jam = jamService.findJam(jamId);

        ResponseSpecificJamDto response = mapper.jamToResponseSpecificJamDto(jam);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * JAM-04: Jam 전체 조회
     * Authorized: ALL
     */
    @GetMapping
    public Page<ResponseAllJamsDto> getJams(Pageable pageable) {
        Page<Jam> pageJams = jamRepository.jamPage(pageable);

        Page<ResponseAllJamsDto> response = pageJams.map(mapper::jamToResponseAllJamsDto);

        return response;
    }

    /**
     * JAM-05: 분야 별 Jam 전체 조회
     * Authorized: ALL
     */
    @GetMapping("/category")
    public Page<ResponseAllJamsDto> categoryJams(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable pageable, @RequestParam Category category) {
        Page<Jam> pageJams = jamRepository.findJamByCategory(pageable, category);

        Page<ResponseAllJamsDto> response = pageJams.map(mapper::jamToResponseCategoryJamsDto);

        return response;
    }

    /**
     * JAM-11: Jam 삭제
     * Authorized: USER(Writer)
     */
    @DeleteMapping("/{jam_id}")
    public ResponseEntity deleteJam(@PathVariable("jam_id") Long jamId,
        Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        Jam findJam = jamService.findVerifiedJam(jamId);

        if (member.getEmail().equals(findJam.getMember().getEmail())) {
            jamService.deleteJam(jamId);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {

            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }
    }

    /**
     * SEARCH-01: Title or Contents 검색
     * Authorized: ALL
     */
    @GetMapping("/search")
    public ResponseEntity searchTitleOrContent(@RequestParam String keyword) {
        List<Jam> jams = jamService.searchTitleOrContent(keyword);
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.jamToResponseAllJamsDto(jams)),
            HttpStatus.OK);
    }

    /**
     * SEARCH-02: User nickname 검색
     * Authorized: ALL
     */
    @GetMapping("/search/nickname")
    public ResponseEntity searchNickname(@RequestParam String nickname) {
        List<Jam> jams = jamService.searchNickname(nickname);
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.jamToResponseAllJamsDto(jams)),
            HttpStatus.OK);
    }
}

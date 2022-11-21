package com.jamit.member.controller;

import com.jamit.global.dto.SingleResponseDto;
import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import com.jamit.member.mapper.MemberMapper;
import com.jamit.member.service.MemberService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
@Validated
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDto.Signup requestBody) {
        Member member = mapper.memberSignupToMember(requestBody);
        Member signupMember = memberService.signupMember(member);
        MemberDto.Response response = mapper.memberToMemberResponse(signupMember);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

}
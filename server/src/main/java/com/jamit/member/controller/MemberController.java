package com.jamit.member.controller;

import com.jamit.auth.userdetails.MemberDetailsService.MemberDetails;
import com.jamit.global.dto.SingleResponseDto;
import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import com.jamit.member.mapper.MemberMapper;
import com.jamit.member.service.MemberService;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    /**
     * USER-01: Local User 회원가입
     */
    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDto.Signup requestBody) {
        Member member = mapper.memberSignupToMember(requestBody);
        Member signupMember = memberService.signupMember(member);
        MemberDto.UpdateResponse response = mapper.memberToUpdateResponse(signupMember);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

//    @PostMapping("/logout") // 클라이언트 일?
//    public ResponseEntity logout(HttpServletRequest request) {
//
//
//        return new ResponseEntity<>(new SingleResponseDto<>(), HttpStatus.CREATED);
//    }

//    @PostMapping("/profile")
//    public ResponseEntity mypage(HttpServletRequest request) {
//
//
////        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
////        Member member = (Member)authentication.getPrincipal();
//
//    }

    /**
     * USER-08: Local User 정보 수정
     */
    @PatchMapping("/change/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive Long memberId,
        @Valid @RequestBody MemberDto.UpdateMember requestBody, Authentication authentication) {
        Member findMember = memberService.findVerifiedMember(memberId);

        if (authentication.getName().equals(findMember.getEmail())) {
            requestBody.setMemberId(memberId);
            Member member = mapper.memberUpdateToMember(requestBody);
            Member updateMember = memberService.updateMember(member);
            MemberDto.UpdateResponse response = mapper.memberToUpdateResponse(updateMember);

            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
        } else {

            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }

    }

    /**
     * USER-09: Local User 프로필 조회
     */
//    @GetMapping("/profile/{member-id}")
//    public ResponseEntity userProfile(@PathVariable("member-id") @Positive Long memberId) {
//        Member member = memberService.findVerifiedMember(memberId);
//    }

    /**
     * Access Key 로 Authentication 조회
     */
    @GetMapping("/get/authentication")
    public ResponseEntity user(Authentication authentication) {
        System.out.println("인증 객체 : " + authentication.getPrincipal());
        System.out.println("인증 객체 : " + authentication.getName());
        System.out.println("인증 객체 : " + authentication.getCredentials());
        System.out.println("인증 객체 : " + authentication.getDetails());
        System.out.println("인증 객체 : " + authentication.getAuthorities());
        System.out.println("인증 객체 : " + authentication.getClass());
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * Access Key 로 MemberDetails 조회
     */
    @GetMapping("/get/memberdetails")
    public ResponseEntity apUser(@AuthenticationPrincipal MemberDetails memberDetails) {
        System.out.println("인증 객체 : " + memberDetails.getMemberId());
        System.out.println("인증 객체 : " + memberDetails.getEmail());
        System.out.println("인증 객체 : " + memberDetails.getImage());
        System.out.println("인증 객체 : " + memberDetails.getNickname());
        System.out.println("인증 객체 : " + memberDetails.getPassword());
        System.out.println("인증 객체 : " + memberDetails.getUsername());
        System.out.println("인증 객체 : " + memberDetails.getAuthorities());
        return new ResponseEntity(HttpStatus.OK);
    }

    /** Header 값 가져오기 */
//    @GetMapping("/get/header")
//    public ResponseEntity getHeader(Authentication authentication, @RequestHeader("login") String login){
//
//        return new ResponseEntity(HttpStatus.OK);
//    }

}
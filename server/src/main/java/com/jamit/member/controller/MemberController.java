package com.jamit.member.controller;

import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.global.dto.SingleResponseDto;
import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import com.jamit.member.mapper.MemberMapper;
import com.jamit.member.dto.ProfileDto;
import com.jamit.member.repository.MemberRepository;
import com.jamit.member.service.MemberService;
import java.security.Principal;
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
    private final MemberRepository memberRepository;

    /**
     * USER-01: Local User 회원가입
     * Authorized: ALL
     */
    @PostMapping("/signup")
    public ResponseEntity signup(@Valid @RequestBody MemberDto.Signup requestBody) {
        Member member = mapper.memberSignupToMember(requestBody);
        Member signupMember = memberService.signupMember(member);
        MemberDto.UpdateResponse response = mapper.memberToUpdateResponse(signupMember);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }

    /**
     * USER-06: 이메일 중복 체크
     * Authorized: ALL
     */
    @PostMapping("/signup/existsemail")
    public ResponseEntity checkEmailDuplicate(@RequestBody String email) {


        return new ResponseEntity(new SingleResponseDto<>(memberRepository.existsByEmail(email)), HttpStatus.OK);
    }

    /**
     * USER-07: User 비밀번호 찾기 - 비밀번호 찾기 페이지
     * Authorized: ALL
     */
    @PostMapping("/findpassword")
    public ResponseEntity findPassword(@RequestBody MemberDto.findPassword requestBody) {
        Member member = memberService.findVerifiedMemberByEmail(requestBody.getEmail());

        return new ResponseEntity(new SingleResponseDto<>(member), HttpStatus.OK);
    }

    /**
     * USER-07: User 비밀번호 찾기 - 이메일로 임시 비밀번호 보내기
     * Authorized: ALL
     */
    @PostMapping("/findpassword/send")
    public ResponseEntity sendTempPassword(@RequestBody MemberDto.sendTempPassword requestBody) {
        Member member = memberService.findPassword(requestBody.getEmail(), requestBody.getNickname());
        memberService.sendTempPassword(member);

        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * USER-08: Local User 정보 수정
     * Authorized: Writer
     */
    @PatchMapping("/change/{member-id}")
    public ResponseEntity updateMember(@PathVariable("member-id") @Positive Long memberId,
        @Valid @RequestBody MemberDto.UpdateMember requestBody, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        Member findMember = memberService.findVerifiedMemberByMemberId(memberId);

        if (member.getEmail().equals(findMember.getEmail())) {
            requestBody.setMemberId(memberId);
            Member UpdateToMember = mapper.memberUpdateToMember(requestBody);
            Member updateMember = memberService.updateMember(UpdateToMember);
            MemberDto.UpdateResponse response = mapper.memberToUpdateResponse(updateMember);

            return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
        } else {
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }
    }

    /**
     * USER-09: Local User 프로필 조회
     * Authorized: USER
     */
    @GetMapping("/profile/{member-id}")
    public ResponseEntity userProfile(@PathVariable("member-id") @Positive Long memberId) {
        Member member = memberService.findVerifiedMemberByMemberId(memberId);
        ProfileDto.Response response = mapper.memberToProfileResponse(member);

        return new ResponseEntity(new SingleResponseDto<>(response), HttpStatus.OK);
    }

    /**
     * Authentication 토큰 조회
     */
    @GetMapping("/get/authentication")
    public ResponseEntity authentication(Authentication authentication) {

        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();

        Member member = memberDetails.getMember();

        System.out.println("인증 객체 : " + memberDetails.getUsername());
        System.out.println("인증 객체 : " + memberDetails.getPassword());
        System.out.println("인증 객체 : " + memberDetails.getAuthorities());

        System.out.println("인증 객체 : " + member.getEmail());
        System.out.println("인증 객체 : " + member.getPassword());
        System.out.println("인증 객체 : " + member.getRoles());
        System.out.println("인증 객체 : " + member.getNickname());

        return new ResponseEntity(member, HttpStatus.OK);
    }

    /**
     * principal 조회
     */
    @GetMapping("/get/principal")
    public ResponseEntity principal(Principal principal) {

        System.out.println(principal.getName());

        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * @AuthenticationPrincipal MemberDetails 조회
     */
    @GetMapping("/get/memberdetails")
    public ResponseEntity memberDetails(@AuthenticationPrincipal MemberDetails memberDetails) {

        Member member = memberDetails.getMember();

        System.out.println("인증 객체 : " + memberDetails.getUsername());
        System.out.println("인증 객체 : " + memberDetails.getPassword());
        System.out.println("인증 객체 : " + memberDetails.getAuthorities());

        System.out.println("인증 객체 : " + member.getEmail());
        System.out.println("인증 객체 : " + member.getPassword());
        System.out.println("인증 객체 : " + member.getRoles());
        System.out.println("인증 객체 : " + member.getNickname());

        return new ResponseEntity(member, HttpStatus.OK);
    }

}
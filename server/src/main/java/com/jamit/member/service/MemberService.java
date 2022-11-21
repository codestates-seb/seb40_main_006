package com.jamit.member.service;

import com.jamit.auth.utils.CustomAuthorityUtils;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtil;

    /**
     * USER-01: Local 회원가입
     */
    public Member signupMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtil.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

//    public Member signupMember(Member member) {
//        Member savedMember = memberRepository.save(member);
//
//        return savedMember;
//    }

    /**
     * USER-02: Local 로그인
     */
//    public Member loginMember(Member member) {
//        Member verifiedExistsMember = verifyExistsEmailAndPassword(member.getEmail(),
//            member.getPassword());
//
//        verifiedExistsMember.setLoginOk(true);
//
//        return verifiedExistsMember;
//    }

    /**
     * USER-03: 정보 수정
     */
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getEmail())
                .ifPresent(email -> findMember.setEmail(email));
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));

        return memberRepository.save(findMember);
    }

    /**
     * USER-04: Local 로그아웃
     */
//    public Member logoutMember(Member member) {
//        Member verifiedExistsMember = verifyExistsEmail(member.getEmail());
//
//        verifiedExistsMember.setLoginOk(false);
//
//        return verifiedExistsMember;
//    }

    /**
     * 유저 Id 찾기
     */
    public Member findVerifiedMember(Long MemberId) {
        Optional<Member> optionalMember = memberRepository.findByMemberId(MemberId);

        Member findMember = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    /**
     * 유저 이메일, 비밀번호 찾기
     */
    public Member verifyExistsEmailAndPassword(String memberEmail, String memberPassword) {
        Optional<Member> optionalMember = memberRepository.findByEmailAndPassword(
                memberEmail, memberPassword);

        Member existsEmailAndPassword = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        return existsEmailAndPassword;
    }

    /**
     * 유저 이메일 중복 검사
     */
    public void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    /**
     * 유저 이름 찾기
     */
    public Member verifyExistsNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        Member existsNickname = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        return existsNickname;
    }
}
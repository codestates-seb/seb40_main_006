package com.jamit.member.service;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.entity.Member;
import com.jamit.member.entity.Member.Role;
import com.jamit.member.repository.MemberRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public Member signupMember(Member member) {
        verifyExistsEmail(member.getEmail());
        verifyExistsNickname(member.getNickname());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        if (member.getEmail() == "admin@gmail.com") {
            member.setRoles(Role.ADMIN);
        } else {
            member.setRoles(Role.USER);
        }

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getNickname())
            .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
            .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getProfileImage())
            .ifPresent(image -> findMember.setProfileImage(image));

        return memberRepository.save(findMember);
    }

    /**
     * member id 찾기
     */
    public Member findVerifiedMember(Long MemberId) {
        Optional<Member> optionalMember = memberRepository.findByMemberId(MemberId);
        Member findMember = optionalMember.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    /**
     * member nickname 찾기
     */
    public Member findVerifiedNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        Member existsNickname = optionalMember.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return existsNickname;
    }

    /**
     * member email 찾기
     */
    public Member findVerifiedMemberEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        Member findMember = optionalMember.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    /**
     * member email 중복 검사
     */
    public void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SIGNUP_EXISTS_EMAIL);
        }
    }

    /**
     * member nickname 중복 검사
     */
    public void verifyExistsNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SIGNUP_EXISTS_NICKNAME);
        }
    }
}
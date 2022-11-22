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

    public Member signupMember(Member member) {
        verifyExistsEmail(member.getEmail());

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtil.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getNickname())
            .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
            .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getImage())
            .ifPresent(image -> findMember.setImage(image));

        return memberRepository.save(findMember);
    }

    /**
     * memberId 찾기
     */
    public Member findVerifiedMember(Long MemberId) {
        Optional<Member> optionalMember = memberRepository.findByMemberId(MemberId);

        Member findMember = optionalMember.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    /**
     * member email, password 찾기
     */
    public Member verifyExistsEmailAndPassword(String memberEmail, String memberPassword) {
        Optional<Member> optionalMember = memberRepository.findByEmailAndPassword(
            memberEmail, memberPassword);

        Member existsEmailAndPassword = optionalMember.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        return existsEmailAndPassword;
    }

    /**
     * member email 중복 검사
     */
    public void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }
    }

    /**
     * member nickname 찾기
     */
    public Member verifyExistsNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        Member existsNickname = optionalMember.orElseThrow(
            () -> new BusinessLogicException(ExceptionCode.MEMBER_EXISTS));

        return existsNickname;
    }

    public Member findMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }
}
package com.jamit.member.service;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.member.dto.GradePostDto;
import com.jamit.member.entity.Grade;
import com.jamit.member.entity.Member;
import com.jamit.member.entity.Role;
import com.jamit.member.repository.GradeRepository;
import com.jamit.member.repository.MemberRepository;

import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import javax.mail.internet.MimeMessage;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final GradeRepository gradeRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSenderImpl mailSender;

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
        Member findMember = findVerifiedMemberByMemberId(member.getMemberId());
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> findMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(passwordEncoder.encode(password)));
        Optional.ofNullable(member.getProfileImage())
                .ifPresent(image -> findMember.setProfileImage(image));

        return memberRepository.save(findMember);
    }

    /**
     * member id ??????
     */
    public Member findVerifiedMemberByMemberId(Long MemberId) {
        Optional<Member> optionalMember = memberRepository.findByMemberId(MemberId);
        Member findMember = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    /**
     * member nickname ??????
     */
    public Member findVerifiedMemberByNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        Member existsNickname = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return existsNickname;
    }

    /**
     * member email ??????
     */
    public Member findVerifiedMemberByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        Member findMember = optionalMember.orElseThrow(
                () -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    /**
     * ???????????? ??????
     */
    public Member findPassword(String email, String nickname) {
        Member findMember = memberRepository.findByEmailAndNickname(email, nickname)
                .orElseThrow(
                        () -> new BusinessLogicException(ExceptionCode.INVALID_AUTHCODE));

        return findMember;
    }

    /**
     * ?????? mail ??????
     */
    public void sendTempPassword(Member member) {
        Random random = new Random();
        int randomInt = random.nextInt(99999999);
        String tempPassword = String.valueOf(randomInt);

        String title = "Jam it ?????? ???????????? ?????????.";
        String content =
                "<h1> Jam it ?????? ?????????????????????. </h1>" +
                        "<br>" +
                        "?????? ????????????: " + tempPassword +
                        "<br>" +
                        "?????? ??????????????? ????????? ??? ??????????????? ??????????????????.";

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
            helper.setFrom("vbcutm427@gmail.com");
            helper.setTo(member.getEmail());
            helper.setSubject(title);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        member.setPassword(passwordEncoder.encode(tempPassword));
        memberRepository.save(member);
    }

    /**
     * member email ?????? ??????
     */
    public void verifyExistsEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SIGNUP_EXISTS_EMAIL);
        }
    }

    /**
     * member nickname ?????? ??????
     */
    public void verifyExistsNickname(String nickname) {
        Optional<Member> optionalMember = memberRepository.findByNickname(nickname);

        if (optionalMember.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SIGNUP_EXISTS_NICKNAME);
        }
    }

    /*
     * ?????? ?????? ??????
     * */
    public void giveGrades(GradePostDto gradePostDto, Long memberId, Long loggedOnId) {

        Member verifiedMember = findVerifiedMemberByMemberId(memberId);
        Optional<Grade> optionalGrade = gradeRepository.findByGaveGradeIdAndMember_MemberId(loggedOnId, memberId);
        Grade grade = optionalGrade.orElse(new Grade());

        System.out.println("?????? ????????? : " + verifiedMember.getMemberId());
        System.out.println("?????? ???????????? ????????? : " + loggedOnId);

        if (Objects.equals(memberId, loggedOnId)) {
            throw new BusinessLogicException(ExceptionCode.CAN_NOT_GRADE);
        }

        int gradeCount = verifiedMember.getGradeCount();
        double currentGrade = verifiedMember.getGrade();
        double updateGrade;

        if (gradeCount == 0) {
            updateGrade = gradePostDto.getGrade();
        } else {
            updateGrade = (((double) gradeCount * currentGrade) + gradePostDto.getGrade()) / (double) (gradeCount + 1);
        }
        verifiedMember.setGrade(Double.parseDouble(String.format("%.1f", updateGrade)));
        verifiedMember.setGradeCount(gradeCount + 1);
        memberRepository.save(verifiedMember);
//        System.out.println(">>> setGrade : " + verifiedMember.getGrade());

    }

}
package com.jamit.jam.service;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.repository.JamRepository;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import com.jamit.member.service.MemberService;
import java.time.LocalDateTime;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class JamService {
    private final JamRepository jamRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public Jam createJam(Jam jam) {
        Member member = memberService.verifyExistsNickname(jam.getMember().getNickname());
        jam.setMember(member);

        if (jam.isRealTime()) {
            jam.setJamTo(LocalDateTime.now());
            jam.setJamFrom(LocalDateTime.now());
        }

        jamRepository.save(jam);

        return jam;
    }

    public Jam updateJam(Jam jam) {
        Jam verifiedJam = findVerifiedJam(jam.getId());

        Optional.ofNullable(jam.getTitle()).ifPresent(verifiedJam::setTitle);
        Optional.ofNullable(jam.getCategory()).ifPresent(verifiedJam::setCategory);
        Optional.of(jam.getMaximum()).ifPresent(verifiedJam::setMaximum);
        Optional.ofNullable(jam.getJamFrom()).ifPresent(verifiedJam::setJamFrom);
        Optional.ofNullable(jam.getJamTo()).ifPresent(verifiedJam::setJamTo);
        Optional.of(jam.isRealTime()).ifPresent(verifiedJam::setRealTime);
        Optional.ofNullable(jam.getContent()).ifPresent(verifiedJam::setContent);

        return jamRepository.save(verifiedJam);
    }

    public Jam findJam(Long jamId) {
        Jam jam = findVerifiedJam(jamId);

        return jam;
    }

    public void deleteJam(Long jamId) {
        Jam findJam = findVerifiedJam(jamId);

        jamRepository.delete(findJam);
    }

    public Jam findVerifiedJam(Long jamId) {
        Optional<Jam> getJam = jamRepository.findById(jamId);

        return getJam.orElseThrow(() -> new BusinessLogicException(ExceptionCode.JAM_NOT_FOUND));
    }
}

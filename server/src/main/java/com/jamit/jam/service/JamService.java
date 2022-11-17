package com.jamit.jam.service;

import com.jamit.jam.entity.Jam;
import com.jamit.jam.repository.JamRepository;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import com.jamit.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
//@Transactional
public class JamService {

    private final JamRepository jamRepository;
    private final MemberService memberService;

    public Jam createJam(Jam jam) {
        Member member = memberService.findVerifiedMember(jam.getMember().getMemberId());
        jam.setMember(member);
        return jamRepository.save(jam);
    }

    public Jam updateJam(Jam jam) {

        return null;
    }

    public Jam findJam(Long jamId) {

        return null;
    }

    public void deleteJam(Long jamId) {

    }
}

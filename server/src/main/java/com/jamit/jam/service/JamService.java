package com.jamit.jam.service;

import com.jamit.jam.entity.Jam;
import com.jamit.jam.repository.JamRepository;
import com.jamit.member.entity.Member;
import com.jamit.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class JamService {
    private final JamRepository jamRepository;
    private final MemberRepository memberRepository;

    public Jam createJam(Jam jam, Member member) {
        memberRepository.save(member);

        jam.setMember(member);

        jamRepository.save(jam);

        return jam;
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

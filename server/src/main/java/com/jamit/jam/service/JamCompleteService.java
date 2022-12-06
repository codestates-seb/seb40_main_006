package com.jamit.jam.service;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.repository.JamRepository;
import com.jamit.jam.status.CompleteStatus;
import com.jamit.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class JamCompleteService {

    private final JamRepository jamRepository;

    public void createJamComplete(Member member, Long jamId) {
        Jam jam = verify(member, jamId);

        jam.setCompleteStatus(CompleteStatus.TRUE);
    }

    public void deleteJamComplete(Member member, Long jamId) {
        Jam jam = verify(member, jamId);

        jam.setCompleteStatus(CompleteStatus.FALSE);
    }

    private Jam verify(Member member, Long jamId) {
        Jam jam = verifiedJam(jamId);

        if (!jam.getMember().getMemberId().equals(member.getMemberId())) {
            throw new BusinessLogicException(ExceptionCode.NO_AUTHORITY);
        }

        return jam;
    }

    private Jam verifiedJam(Long jamId) {

        return jamRepository.findById(jamId)
            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.JAM_NOT_FOUND));
    }
}

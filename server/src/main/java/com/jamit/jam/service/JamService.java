package com.jamit.jam.service;

import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.entity.JamParticipant;
import com.jamit.jam.repository.JamRepository;
import com.jamit.jam.status.ParticipantStatus;
import com.jamit.member.entity.Member;
import com.jamit.member.service.MemberService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class JamService {

    private final JamRepository jamRepository;
    private final MemberService memberService;

    public Jam createJam(Jam jam, Member member) throws ParseException {
        JamParticipant participant = new JamParticipant(ParticipantStatus.TRUE, member, jam);

        String pointWKT = String.format("POINT(%s %s)", jam.getLatitude(), jam.getLongitude());
        Point point = (Point) new WKTReader().read(pointWKT);

        if (jam.getRealTime()) {
            jam.setJamTo(LocalDateTime.now());
            jam.setJamFrom(LocalDateTime.now());
        }

        jam.setMember(member);
        jam.addParticipant(participant);
        jam.setPoint(point);

        jamRepository.save(jam);

        return jam;
    }

    public Jam updateJam(Jam jam) throws ParseException {
        Jam verifiedJam = findVerifiedJam(jam.getId());

        Optional.ofNullable(jam.getCategory()).ifPresent(verifiedJam::setCategory);
        Optional.ofNullable(jam.getTitle()).ifPresent(verifiedJam::setTitle);
        Optional.ofNullable(jam.getContent()).ifPresent(verifiedJam::setContent);
        Optional.ofNullable(jam.getImage()).ifPresent(verifiedJam::setImage);
        Optional.ofNullable(jam.getJamFrom()).ifPresent(verifiedJam::setJamFrom);
        Optional.ofNullable(jam.getJamTo()).ifPresent(verifiedJam::setJamTo);
        Optional.ofNullable(jam.getCapacity()).ifPresent(verifiedJam::setCapacity);
        Optional.ofNullable(jam.getRealTime()).ifPresent(verifiedJam::setRealTime);
        Optional.ofNullable(jam.getAddress()).ifPresent(verifiedJam::setAddress);
        Optional.ofNullable(jam.getLocation()).ifPresent(verifiedJam::setLocation);
        Optional.ofNullable(jam.getLatitude()).ifPresent(verifiedJam::setLatitude);
        Optional.ofNullable(jam.getLongitude()).ifPresent(verifiedJam::setLongitude);

        String pointWKT = String.format("POINT(%s %s)", verifiedJam.getLatitude(), verifiedJam.getLongitude());
        Point point = (Point) new WKTReader().read(pointWKT);
        verifiedJam.setPoint(point);

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

    public Page<Jam> searchTitleOrContent(String keyword, Pageable pageable) {
        Page<Jam> jams = Optional.ofNullable(jamRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable))
                .orElseThrow(IllegalAccessError::new);
        return jams;
    }

    public List<Jam> searchNickname(String nickname) {
        Member member = memberService.findVerifiedNickname(nickname);
        Long memberId = member.getMemberId();
        return jamRepository.findByJamMemberId(memberId);
    }
}

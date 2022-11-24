package com.jamit.jam.controller;

import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.exception.BusinessLogicException;
import com.jamit.exception.ExceptionCode;
import com.jamit.global.dto.SingleResponseDto;
import com.jamit.jam.entity.JamParticipant;
import com.jamit.jam.service.JamParticipantService;
import com.jamit.jam.service.JamService;
import com.jamit.jam.status.ParticipantStatus;
import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import com.jamit.member.service.MemberService;
import java.security.Principal;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jams/{jam_id}/participation")
@RequiredArgsConstructor
@Validated
public class JamParticipantController {
    private final JamParticipantService jamParticipantService;
    private final MemberService memberService;
    private final JamService jamService;

    /**
     * JAM-07: Jam 참여
     * Authorized: USER
     */
    @PostMapping("/true")
    public ResponseEntity postParticipant(@Positive @PathVariable("jam_id") Long jamId,
        Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        JamParticipant jamParticipant = buildParticipant(
            jamId,
            member.getEmail(),
            ParticipantStatus.TRUE
        );

        jamParticipantService.updateStatusOrCreateParticipantIfNotExist(jamParticipant);

        return ResponseEntity.ok().build();
    }

    /**
     * JAM-08: Jam 참여 취소
     * Authorized: USER(Jam Member)
     */
    @DeleteMapping("/false")
    public ResponseEntity deleteParticipant(@Positive @PathVariable("jam_id") Long jamId, Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        JamParticipant jamParticipant = buildParticipant(
            jamId,
            member.getEmail(),
            ParticipantStatus.FALSE
        );

        jamParticipantService.deleteJamParticipant(jamParticipant);

        return ResponseEntity.ok().build();
    }

    private JamParticipant buildParticipant(Long jamId, String email, ParticipantStatus status) {
        JamParticipant jamParticipant = JamParticipant.builder()
            .status(status)
            .build();

        jamParticipant.setJam(jamService.findVerifiedJam(jamId));
        jamParticipant.setMember(memberService.findVerifiedMemberEmail(email));

        return jamParticipant;
    }
}
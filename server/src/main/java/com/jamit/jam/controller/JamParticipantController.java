package com.jamit.jam.controller;

import com.jamit.jam.entity.JamParticipant;
import com.jamit.jam.service.JamParticipantService;
import com.jamit.jam.service.JamService;
import com.jamit.jam.status.ParticipantStatus;
import com.jamit.member.service.MemberService;
import java.security.Principal;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/participation/{jam_id}")
@RequiredArgsConstructor
@Validated
public class JamParticipantController {
    private final JamParticipantService jamParticipantService;
    private final MemberService memberService;
    private final JamService jamService;

    @PostMapping("/true")
    public ResponseEntity postParticipant(@Positive @PathVariable("jam_id") Long jamId,
        @AuthenticationPrincipal String email) {
        JamParticipant jamParticipant = buildParticipant(
            jamId,
            email,
            ParticipantStatus.TRUE
        );

        jamParticipantService.updateStatusOrCreateParticipantIfNotExist(jamParticipant);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/false")
    public ResponseEntity deleteParticipant(@Positive @PathVariable("jam_id") Long jamId, Principal principal) {
        JamParticipant jamParticipant = buildParticipant(
            jamId,
            principal.getName(),
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
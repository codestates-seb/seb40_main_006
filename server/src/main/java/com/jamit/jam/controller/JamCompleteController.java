package com.jamit.jam.controller;

import com.jamit.auth.userdetails.MemberDetails;
import com.jamit.jam.service.JamCompleteService;
import com.jamit.member.entity.Member;
import javax.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/jams/{jam_id}/complete")
@RequiredArgsConstructor
@Validated
public class JamCompleteController {

    private final JamCompleteService jamCompleteService;

    /**
     * JAM-09: Jam 모집 완료
     * Authorized: USER(Writer)
     */
    @PostMapping("/true")
    public ResponseEntity postComplete(Authentication authentication,
        @PathVariable("jam_id") @Positive Long jamId) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        jamCompleteService.createJamComplete(member, jamId);
//        jamCompleteService.createJamComplete(member, jamId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * JAM-10: Jam 모집 완료 취소
     * Authorized: USER(Writer)
     */
    @DeleteMapping("/false")
    public ResponseEntity deleteComplete(Authentication authentication,
        @PathVariable("jam_id") @Positive Long jamId) {
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member member = memberDetails.getMember();

        jamCompleteService.deleteJamComplete(member, jamId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
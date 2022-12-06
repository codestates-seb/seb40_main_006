package com.jamit.jam.service;

import com.jamit.jam.entity.JamParticipant;
import com.jamit.jam.repository.JamParticipantRepository;
import com.jamit.jam.status.ParticipantStatus;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JamParticipantService {

    private final JamParticipantRepository jamParticipantRepository;

    public void createJamParticipant(JamParticipant jamParticipant) {
        jamParticipant.getJam().addCurrentPpl(1);

        jamParticipantRepository.save(jamParticipant);
    }

    public void updateJamParticipantStatus(JamParticipant jamParticipant,
        ParticipantStatus status) {
        jamParticipant.setStatus(status);

        jamParticipantRepository.save(jamParticipant);
    }

    public void deleteJamParticipant(JamParticipant jamParticipant) {
        Optional<JamParticipant> findOrNull = findByJamAndMember(jamParticipant);

        findOrNull.ifPresent(participant -> {
            jamParticipant.getJam().addCurrentPpl(-1);
            jamParticipantRepository.delete(participant);
        });
    }

    public Optional<JamParticipant> findByJamAndMember(JamParticipant jamParticipant) {

        return jamParticipantRepository.findByJamIdAndMember_MemberId(
            jamParticipant.getJam().getId(),
            jamParticipant.getMember().getMemberId()
        );
    }

    public void updateStatusOrCreateParticipantIfNotExist(JamParticipant jamParticipant) {
        Optional<JamParticipant> findOrNull = findByJamAndMember(jamParticipant);

        findOrNull.ifPresentOrElse(
            find -> updateJamParticipantStatus(find, jamParticipant.getStatus()),
            () -> createJamParticipant(jamParticipant)
        );
    }
}
package com.jamit.jam.repository;

import com.jamit.jam.entity.JamParticipant;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JamParticipantRepository extends JpaRepository<JamParticipant, Long> {
    Optional<JamParticipant> findByJamIdAndMember_MemberId(Long jamId, Long memberId);
}

package com.jamit.member.repository;

import com.jamit.member.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GradeRepository extends JpaRepository<Grade, Long> {

    Optional<Grade> findByGaveGradeIdAndMember_MemberId(Long gaveGradeId, Long memberId);

}

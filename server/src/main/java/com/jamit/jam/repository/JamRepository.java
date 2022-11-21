package com.jamit.jam.repository;

import com.jamit.jam.entity.Jam;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface JamRepository extends JpaRepository<Jam, Long> {
    Optional<Jam> findById(Long memberId);

    @Query("select jam from Jam jam order by jam.createdAt desc")
    Page<Jam> jamPage(Pageable pageable);

    // 제목 or 내용 검색
    List<Jam> findByTitleContainingOrContentContaining(String title, String content);

    // 작성자 검색
    @Query(value = "SELECT * FROM jam WHERE member_id = :memberId ORDER BY created_At DESC", nativeQuery = true)
    List<Jam> findByJamMemberId(@Param("memberId") Long memberId);


}

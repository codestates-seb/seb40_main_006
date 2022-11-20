package com.jamit.jam.repository;

import com.jamit.jam.entity.Jam;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JamRepository extends JpaRepository<Jam, Long> {
    Optional<Jam> findById(Long memberId);

    @Query("select jam from Jam jam order by jam.createdAt desc")
    Page<Jam> jamPage(Pageable pageable);
}

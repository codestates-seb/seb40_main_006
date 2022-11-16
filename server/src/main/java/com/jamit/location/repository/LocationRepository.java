package com.jamit.location.repository;

import com.jamit.jam.entity.Jam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Jam, Long> {

}

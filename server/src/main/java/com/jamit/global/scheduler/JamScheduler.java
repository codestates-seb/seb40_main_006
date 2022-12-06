package com.jamit.global.scheduler;

import com.jamit.jam.entity.Jam;
import com.jamit.jam.repository.JamRepository;
import com.jamit.jam.status.CompleteStatus;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class JamScheduler {
    private final JamRepository jamRepository;

    @Scheduled(cron = "0 0 0 * * *", zone = "Asia/Seoul")
    @Transactional
    public void runtimeJamClosedEveryMidnight() {
        log.info("# Scheduler is running");

        List<Jam> jams = jamRepository.findByCreatedAtAfterAndCompleteStatus(
            LocalDateTime.of(LocalDate.now(), LocalTime.MIN).minusDays(1L), CompleteStatus.FALSE);

        log.info("# jams.size: {}", jams.size());

        jams.forEach(jam -> jam.setCompleteStatus(CompleteStatus.TRUE));
    }
}

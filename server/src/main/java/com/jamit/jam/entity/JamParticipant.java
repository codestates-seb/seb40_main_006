package com.jamit.jam.entity;

import com.jamit.global.audit.Auditable;
import com.jamit.jam.status.ParticipantStatus;
import com.jamit.member.entity.Member;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class JamParticipant extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "jam_participant_id")
    private Long id;

    @Column
    private String image;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ParticipantStatus status = ParticipantStatus.NONE;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "jam_id")
    private Jam jam;

    @Builder
    public JamParticipant(ParticipantStatus status, Member member, Jam jam) {
        this.status = status;
        this.member = member;
        this.jam = jam;
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
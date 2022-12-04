package com.jamit.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Grade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gradeId;

    @Column
    private Long gaveGradeId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}

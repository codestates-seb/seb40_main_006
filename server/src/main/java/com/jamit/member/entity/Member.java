package com.jamit.member.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jamit.global.audit.Auditable;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Email
    @Column(unique = true, updatable = false, nullable = false)
    private String email;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String nickname;

//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdTime = LocalDateTime.now();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

}
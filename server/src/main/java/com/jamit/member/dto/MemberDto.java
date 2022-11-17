package com.jamit.member.dto;

import com.jamit.member.entity.Member;

import java.time.LocalDateTime;

public class MemberDto {

    private Long member_id;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String email;
    private String nickname;

}

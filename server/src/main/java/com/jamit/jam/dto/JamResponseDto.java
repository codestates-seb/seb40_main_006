package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JamResponseDto {
    private Long jamId;
    private Long memberId;
    private String nickname;
    private String title;
    private String content;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Category category;
    private int capacity;
    private boolean realTime = false;
    private boolean complete = false;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setMember(Member member) {
        this.memberId = member.getMemberId();
        this.nickname = member.getNickname();
    }
}

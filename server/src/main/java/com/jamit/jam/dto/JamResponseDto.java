package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JamResponseDto {

    private Long id;
    private String nickname;

    public void setMember(Member member) {
        this.nickname = member.getNickname();
    }

    private String title;
    private String content;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Category category;
    private int currentPpl;
    private int maximum;
    private int capacity;
    private boolean realTime;
    private boolean complete;
    private int views;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

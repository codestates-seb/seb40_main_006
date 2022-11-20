package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseAllJamsDto {
    private Long jamId;
    private String nickname;

    public void setMember(Member member) {
        this.nickname = member.getNickname();
    }

    private String title;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Category category;
    private int currentPpl;
    private int capacity;
    private boolean realTime;
    private boolean complete;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

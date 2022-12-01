package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.jam.status.CompleteStatus;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseAllJamsDto {

    private Long jamId;
    private String nickname;
    private String title;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Category category;
    private int currentPpl;
    private int capacity;
    private boolean realTime;
    private CompleteStatus completeStatus;
    private String address;
    private String location;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String latitude;
    private String longitude;

    public void setMember(Member member) {
        this.nickname = member.getNickname();
    }
}

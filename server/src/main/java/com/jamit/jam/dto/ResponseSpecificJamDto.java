package com.jamit.jam.dto;

import com.jamit.comment.dto.ResponseCommentDto;
import com.jamit.jam.entity.Category;
import com.jamit.jam.status.CompleteStatus;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseSpecificJamDto {

    private Long jamId;
    private String nickname;
    private Category category;
    private String title;
    private String content;
    private String image;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private int currentPpl;
    private int capacity;
    private boolean realTime;
    private CompleteStatus completeStatus;
    private int views;
    private String address;
    private String location;
    private String latitude;
    private String longitude;
    private String openChatLink;
    private List<ResponseParticipantDto> participantList;
    private List<ResponseCommentDto> commentList;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setMember(Member member) {
        this.nickname = member.getNickname();
    }
}

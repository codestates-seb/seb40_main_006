package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import java.util.List;
import javax.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.validator.constraints.Range;

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
    private boolean complete;
    private int views;
    private String address;
    private String location;
    private String latitude;    // 위도
    private String longitude;   // 경도
    private String openChatLink;
    private List<ResponseParticipantDto> participantList;
//  private List<ResponseCommentDto> commentList; // 댓글
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    public void setMember(Member member) {
        this.nickname = member.getNickname();
    }
}

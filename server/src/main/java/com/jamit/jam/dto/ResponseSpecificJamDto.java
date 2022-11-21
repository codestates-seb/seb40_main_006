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

    public void setMember(Member member) {
        this.nickname = member.getNickname();
    }

    private String title;
    private String content;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Category category;
    private int currentPpl;

    @Range(min = 1, max = 100)
    private int capacity;

    private boolean realTime;
    private boolean complete;
    private int views;
    private List<ResponseParticipantDto> participantList;
//  private List<ResponseCommentDto> commentList; // 댓글
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

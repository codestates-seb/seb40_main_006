package com.jamit.reply.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseReplyDto {
    private Long replyId;
    private Long memberId;
    private Long commentId;
    private String nickname;
    private String profileImage;
    private double grade;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}
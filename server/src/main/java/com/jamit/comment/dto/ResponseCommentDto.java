package com.jamit.comment.dto;

import com.jamit.reply.dto.ResponseReplyDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ResponseCommentDto {
    private Long commentId;
    private Long memberId;
    private Long jamId;
    private String nickname;
    private String image;
    private String content;
    private List<ResponseReplyDto> replyList;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

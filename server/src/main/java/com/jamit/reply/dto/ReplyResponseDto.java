package com.jamit.reply.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReplyResponseDto {
    private final LocalDateTime modifiedAt;
}

package com.jamit.reply.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ReplyPostDto {

    private String content;

    @JsonCreator
    public ReplyPostDto(@JsonProperty("content") String content) {
        this.content = content;
    }
}
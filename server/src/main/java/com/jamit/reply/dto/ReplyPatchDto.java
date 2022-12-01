package com.jamit.reply.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class ReplyPatchDto {

    private String content;

    @JsonCreator
    public ReplyPatchDto(@JsonProperty("content") String content) {
        this.content = content;
    }
}
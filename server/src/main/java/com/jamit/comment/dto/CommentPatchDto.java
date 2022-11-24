package com.jamit.comment.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class CommentPatchDto {
    private String content;

    @JsonCreator
    public CommentPatchDto(@JsonProperty("content") String content) {
        this.content = content;
    }
}

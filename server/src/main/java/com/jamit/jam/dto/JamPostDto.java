package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import javax.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JamPostDto {
    @NotBlank
    private Long memberId;

    public Member getMember() {
        Member member = new Member();
        member.setMemberId(memberId);

        return member;
    }

    @NotBlank
    private String title;

    @NotBlank
    private Category category;

    @NotBlank
    private int maximum;

    @NotBlank
    private LocalDateTime jamFrom;

    @NotBlank
    private LocalDateTime jamTo;

    @NotBlank
    private String content;
}

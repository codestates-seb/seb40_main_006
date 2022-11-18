package com.jamit.jam.dto;

import com.jamit.jam.entity.Category;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import javax.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.hibernate.annotations.Parameter;

@Getter
@AllArgsConstructor
public class JamPostDto {

    private String nickname;

    public Member getMember() {
        Member member = new Member();
        member.setNickname(nickname);
        return member;
    }

    private String title;

    private Category category;

    private Integer maximum;

    private LocalDateTime jamFrom;

    private LocalDateTime jamTo;

    private boolean realTime;

    private String content;

}

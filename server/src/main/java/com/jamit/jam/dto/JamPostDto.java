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
    private Category category;
    private String title;
    private String content;
    private String image;
    private LocalDateTime jamFrom;
    private LocalDateTime jamTo;
    private Integer capacity;
    private boolean realTime;
    private String address;
    private String location;
    private String latitude;    // 위도
    private String longitude;   // 경도
    private String openChatLink;

    public Member getMember() {
        Member member = new Member();
        member.setNickname(nickname);
        return member;
    }
}

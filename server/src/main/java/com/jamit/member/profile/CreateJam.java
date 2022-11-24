package com.jamit.member.profile;

import com.jamit.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateJam {
    private Long memberId;
    private Long jamId;
    private String title;
    private String image;
    private String location;
    private Integer currentPpl;
    private Integer capacity;
    private boolean realTime;

    public void setMember(Member member) {
        this.memberId = member.getMemberId();
    }
}

package com.jamit.member.dto;

import com.jamit.jam.entity.JamParticipant;
import com.jamit.member.entity.Member;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;


public class ProfileDto {

    @Getter
    @AllArgsConstructor
    public static class Response {

        private Long memberId;
        private String email;
        private String nickname;
        private String profileImage;
        private Double grade;
        private int gradeCount;
        private List<CreateJam> createJams;
        private List<JoinJam> joinJams;
    }

    @Getter
    @AllArgsConstructor
    public static class CreateJam {

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

    @Getter
    @AllArgsConstructor
    public static class JoinJam {

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

        public void setJam(JamParticipant jamParticipant) {
            this.jamId = jamParticipant.getJam().getId();
        }
    }


}

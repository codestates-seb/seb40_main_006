package com.jamit.member.profile;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProfileResponse {

    private Long memberId;
    private String email;
    private String nickname;
    private String profileImage;
    private List<CreateJam> createJams;
//    private List<JoinJam> joinJams;

}

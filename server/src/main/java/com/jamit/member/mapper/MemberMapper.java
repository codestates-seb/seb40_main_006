package com.jamit.member.mapper;

import com.jamit.jam.entity.Jam;
import com.jamit.jam.entity.JamParticipant;
import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import com.jamit.member.dto.ProfileDto;

import java.util.ArrayList;
import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {

    Member memberSignupToMember(MemberDto.Signup requestBody);

    Member memberUpdateToMember(MemberDto.UpdateMember requestBody);

    MemberDto.UpdateResponse memberToUpdateResponse(Member member);

    default ProfileDto.Response memberToProfileResponse(Member member) {
        if (member == null) {

            return null;
        }

        Long memberId = null;
        String email = null;
        String nickname = null;
        String profileImage = null;
        Double grade = 0.0;
        int gradeCount = 0;


        memberId = member.getMemberId();
        email = member.getEmail();
        nickname = member.getNickname();
        profileImage = member.getProfileImage();
        grade = member.getGrade();
        gradeCount = member.getGradeCount();

        List<ProfileDto.CreateJam> createJams = null;
        createJams = createJamList(member.getJamList());

        List<ProfileDto.JoinJam> joinJams = null;
        joinJams = joinJamList(member.getJamParticipantList());

        ProfileDto.Response profileDto = new ProfileDto.Response(memberId, email, nickname,
                profileImage, grade, gradeCount, createJams, joinJams);

        return profileDto;
    }

    default ProfileDto.CreateJam createJam(Jam jam) {
        if (jam == null) {
            return null;
        }

        Long jamId = null;
        String title = null;
        String image = null;
        String location = null;
        Integer currentPpl = null;
        Integer capacity = null;
        boolean realTime = false;

        jamId = jam.getId();
        title = jam.getTitle();
        image = jam.getImage();
        location = jam.getLocation();
        currentPpl = jam.getCurrentPpl();
        capacity = jam.getCapacity();
        realTime = jam.getRealTime();

        Long memberId = null;

        ProfileDto.CreateJam createJam = new ProfileDto.CreateJam(memberId, jamId, title, image, location, currentPpl,
                capacity, realTime);

        createJam.setMember(jam.getMember());

        return createJam;
    }

    default List<ProfileDto.CreateJam> createJamList(List<Jam> jams) {
        if (jams == null) {
            return null;
        }

        List<ProfileDto.CreateJam> list = new ArrayList<ProfileDto.CreateJam>(jams.size());
        for (Jam jam : jams) {
            list.add(createJam(jam));
        }

        return list;
    }


    default ProfileDto.JoinJam joinJam(JamParticipant jamParticipant) {
        if (jamParticipant == null) {
            return null;
        }

        Long jamId = null;
        String title = null;
        String image = null;
        String location = null;
        Integer currentPpl = null;
        Integer capacity = null;
        boolean realTime = false;

        jamId = jamParticipant.getJam().getId();
        title = jamParticipant.getJam().getTitle();
        image = jamParticipant.getJam().getImage();
        location = jamParticipant.getJam().getLocation();
        currentPpl = jamParticipant.getJam().getCurrentPpl();
        capacity = jamParticipant.getJam().getCapacity();
        realTime = jamParticipant.getJam().getRealTime();

        Long memberId = null;

        ProfileDto.JoinJam joinJam = new ProfileDto.JoinJam(memberId, jamId, title, image, location, currentPpl,
                capacity, realTime);

        joinJam.setMember(jamParticipant.getMember());

        return joinJam;
    }

    default List<ProfileDto.JoinJam> joinJamList(List<JamParticipant> JamParticipants) {
        if (JamParticipants == null) {
            return null;
        }

        List<ProfileDto.JoinJam> list = new ArrayList<ProfileDto.JoinJam>(JamParticipants.size());
        for (JamParticipant jamParticipant : JamParticipants) {
            list.add(joinJam(jamParticipant));
        }

        return list;
    }

}
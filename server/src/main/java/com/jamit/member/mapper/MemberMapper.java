package com.jamit.member.mapper;

import com.jamit.jam.entity.Jam;
import com.jamit.member.dto.MemberDto;
import com.jamit.member.profile.CreateJam;
import com.jamit.member.entity.Member;
import com.jamit.member.profile.ProfileResponse;
import java.util.ArrayList;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberSignupToMember(MemberDto.Signup requestBody);
    Member memberUpdateToMember(MemberDto.UpdateMember requestBody);
    MemberDto.UpdateResponse memberToUpdateResponse(Member member);

    default ProfileResponse memberToProfileResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        Long memberId = null;
        String email = null;
        String nickname = null;
        String profileImage = null;

        memberId = member.getMemberId();
        email = member.getEmail();
        nickname = member.getNickname();
        profileImage = member.getProfileImage();

        List<CreateJam> createJams = null;
        createJams = createJamList(member.getJamList());

        ProfileResponse profileResponse = new ProfileResponse( memberId, email, nickname, profileImage, createJams );

        return profileResponse;
    }
    default CreateJam createJam(Jam jam) {
        if ( jam == null ) {
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
        realTime = jam.isRealTime();

        Long memberId = null;

        CreateJam createJam = new CreateJam( jamId, memberId, title, image, location, currentPpl, capacity, realTime );

        createJam.setMember( jam.getMember() );

        return createJam;
    }
    default List<CreateJam> createJamList(List<Jam> jams) {
        if ( jams == null ) {
            return null;
        }

        List<CreateJam> list = new ArrayList<CreateJam>( jams.size() );
        for ( Jam jam : jams ) {
            list.add( createJam( jam ) );
        }

        return list;
    }



}
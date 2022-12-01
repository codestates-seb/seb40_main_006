package com.jamit.member.mapper;

import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-12-01T20:36:15+0900",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 11.0.15 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberSignupToMember(MemberDto.Signup requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( requestBody.getEmail() );
        member.setPassword( requestBody.getPassword() );
        member.setNickname( requestBody.getNickname() );

        return member;
    }

    @Override
    public Member memberUpdateToMember(MemberDto.UpdateMember requestBody) {
        if ( requestBody == null ) {
            return null;
        }

        Member member = new Member();

        member.setMemberId( requestBody.getMemberId() );
        member.setPassword( requestBody.getPassword() );
        member.setNickname( requestBody.getNickname() );
        member.setProfileImage( requestBody.getProfileImage() );

        return member;
    }

    @Override
    public MemberDto.UpdateResponse memberToUpdateResponse(Member member) {
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

        MemberDto.UpdateResponse updateResponse = new MemberDto.UpdateResponse( memberId, email, nickname, profileImage );

        return updateResponse;
    }
}

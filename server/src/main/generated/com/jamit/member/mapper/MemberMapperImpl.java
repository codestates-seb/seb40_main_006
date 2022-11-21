package com.jamit.member.mapper;

import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-21T12:06:18+0900",
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
    public MemberDto.Response memberToMemberResponse(Member member) {
        if ( member == null ) {
            return null;
        }

        Long memberId = null;
        String email = null;
        String nickname = null;

        memberId = member.getMemberId();
        email = member.getEmail();
        nickname = member.getNickname();

        MemberDto.Response response = new MemberDto.Response( memberId, email, nickname );

        return response;
    }
}

package com.jamit.member.mapper;

import com.jamit.member.dto.MemberDto;
import com.jamit.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberSignupToMember(MemberDto.Signup requestBody);
    Member memberUpdateToMember(MemberDto.UpdateMember requestBody);
    MemberDto.MemberInfoResponse memberToMemberResponse(Member member);
    MemberDto.UpdateResponse memberToUpdateResponse(Member member);

}
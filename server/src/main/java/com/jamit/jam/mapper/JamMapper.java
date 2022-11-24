package com.jamit.jam.mapper;

import com.jamit.jam.dto.*;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.entity.JamParticipant;
import com.jamit.member.entity.Member;
import java.time.LocalDateTime;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JamMapper {

    Jam jamPostDtoToJam(JamPostDto jamPostDto);

    Jam jamPatchDtoToJam(JamPatchDto jamPatchDto);

    @Named("jamList")
    @Mapping(source = "id", target = "jamId")
    @Mapping(source = "member.nickname", target = "nickname")
    ResponseAllJamsDto jamToResponseAllJamsDto(Jam jam);

    @Mapping(source = "id", target = "jamId")
    @Mapping(source = "member.nickname", target = "nickname")
    ResponseSpecificJamDto jamToResponseSpecificJamDto(Jam jam);

    @Mapping(source = "member.memberId", target = "memberId")
    @Mapping(source = "member.nickname", target = "nickname")
    ResponseParticipantDto participantToParticipantListDto(JamParticipant jamParticipant);

    @IterableMapping(qualifiedByName = "jamList")
    List<ResponseAllJamsDto> jamToResponseAllJamsDto(List<Jam> jams);
}
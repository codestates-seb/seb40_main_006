package com.jamit.jam.mapper;

import com.jamit.comment.mapper.CommentMapper;
import com.jamit.jam.dto.*;
import com.jamit.jam.entity.Jam;
import com.jamit.jam.entity.JamParticipant;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", uses = CommentMapper.class,
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
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
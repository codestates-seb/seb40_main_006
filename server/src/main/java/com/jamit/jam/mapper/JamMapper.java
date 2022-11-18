package com.jamit.jam.mapper;

import com.jamit.jam.dto.JamPatchDto;
import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.JamResponseDto;
import com.jamit.jam.entity.Jam;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface JamMapper {

    Jam jamPostDtoToJam(JamPostDto jamPostDto);

    Jam jamPatchDtoToJam(JamPatchDto jamPatchDto);

    @Mapping(source = "id", target = "jamId")
    @Mapping(source = "member.nickname", target = "nickname")
    JamResponseDto jamToJamResponseDto(Jam jam);
}

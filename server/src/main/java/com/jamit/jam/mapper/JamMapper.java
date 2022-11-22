package com.jamit.jam.mapper;

import com.jamit.jam.dto.*;
import com.jamit.jam.entity.Jam;
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
    @Mapping(source = "id",target = "jamId")
    @Mapping(source = "member.nickname",target = "nickname")
    ResponseAllJamsDto jamToResponseAllJamsDto(Jam jam);

    @Mapping(source = "id",target = "jamId")
    @Mapping(source = "member.nickname",target = "nickname")
    ResponseSpecificJamDto jamToResponseSpecificJamDto(Jam jam);

    @IterableMapping(qualifiedByName = "jamList")
    List<ResponseAllJamsDto> jamToResponseAllJamsDto(List<Jam> jams);

}
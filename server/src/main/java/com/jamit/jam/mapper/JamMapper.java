package com.jamit.jam.mapper;

import com.jamit.jam.dto.JamPostDto;
import com.jamit.jam.dto.JamResponseDto;
import com.jamit.jam.entity.Jam;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JamMapper {

    Jam jamPostDtoToJam(JamPostDto jamPostDto);

//    @Mapping(source = "id", target = "jam_id")
    JamResponseDto jamToJamResponseDto(Jam jam);
}

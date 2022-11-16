package com.jamit.location.mapper;

import com.jamit.jam.dto.JamResponseDto;
import com.jamit.jam.entity.Jam;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    List<JamResponseDto>  jamsToJamResponseDto(List<Jam> jams);
}
